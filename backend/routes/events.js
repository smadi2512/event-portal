const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { getAll, get, add, replace, remove } = require("../data/event");
const { checkAuth } = require("../util/auth");
const { isValidText, isValidDate } = require("../util/validation");

const router = express.Router();

// Configure Multer for image storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, "../uploads");
    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename for image
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, "event-" + uniqueSuffix + fileExtension);
  },
});

// Filter files to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Create endpoint to serve static images
router.use("/images", express.static(path.join(__dirname, "../uploads")));

// GET /events - Get all events
router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const events = await getAll();
    res.json({ events: events });
  } catch (error) {
    next(error);
  }
});

// GET /events/:id - Get single event by ID
router.get("/:id", async (req, res, next) => {
  try {
    const event = await get(req.params.id);
    res.json({ event: event });
  } catch (error) {
    next(error);
  }
});

// Apply authentication middleware to all routes below
router.use(checkAuth);

// POST /events - Create new event with image upload
router.post("/", upload.single("image"), async (req, res, next) => {
  console.log(req.token);

  let errors = {};

  // Validate required fields
  if (!req.file) {
    errors.image = "Image is required.";
  }

  if (!isValidText(req.body.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(req.body.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(req.body.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidText(req.body.location)) {
    errors.location = "Invalid location.";
  }

  // Return validation errors if any
  if (Object.keys(errors).length > 0) {
    // Delete uploaded file if there are validation errors
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(422).json({
      message: "Adding the event failed due to validation errors.",
      errors,
    });
  }

  try {
    // Prepare event data
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      image: `/events/images/${req.file.filename}`, // Local image path
    };

    await add(eventData);
    res.status(201).json({
      message: "Event saved.",
      event: eventData,
    });
  } catch (error) {
    // Delete uploaded file if data saving fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
});

// PATCH /events/:id - Update existing event with optional image upload
router.patch("/:id", upload.single("image"), async (req, res, next) => {
  let errors = {};

  // Validate input fields
  if (!isValidText(req.body.title)) {
    errors.title = "Invalid title.";
  }

  if (!isValidText(req.body.description)) {
    errors.description = "Invalid description.";
  }

  if (!isValidDate(req.body.date)) {
    errors.date = "Invalid date.";
  }

  if (!isValidText(req.body.location)) {
    errors.location = "Location must be a valid text between 1-100 characters.";
  }

  if (Object.keys(errors).length > 0) {
    // Delete uploaded file if validation fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(422).json({
      message: "Updating the event failed due to validation errors.",
      errors,
    });
  }

  try {
    // Get existing event data
    const existingEvent = await get(req.params.id);

    // Prepare updated event data
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      // Use new image if uploaded, otherwise keep existing one
      image: req.file
        ? `/events/images/${req.file.filename}`
        : existingEvent.image,
    };

    await replace(req.params.id, eventData);

    // Delete old image if a new one was uploaded and old one was local
    if (
      req.file &&
      existingEvent.image &&
      !existingEvent.image.startsWith("http")
    ) {
      const oldImagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(existingEvent.image)
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    res.json({
      message: "Event updated.",
      event: eventData,
    });
  } catch (error) {
    // Delete uploaded file if update fails
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
});

// DELETE /events/:id - Delete event and its associated image
router.delete("/:id", async (req, res, next) => {
  try {
    const event = await get(req.params.id);

    // Delete associated image if it's a local file
    if (event.image && !event.image.startsWith("http")) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        path.basename(event.image)
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await remove(req.params.id);
    res.json({ message: "Event deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
