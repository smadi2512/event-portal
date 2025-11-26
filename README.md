# <img src="./frontend/public/favicon.svg" alt="ReactSphere logo" width="50" align="center"/> Event Portal

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.9.4-CA4245?logo=react-router)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)
![Vite](https://img.shields.io/badge/Vite-7.1.9-646CFF?logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.1.14-06B6D4?logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-22.14.0-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.21.2-000000?logo=express)

A modern **full-stack** events portal built with **React + React Router** that allows users to **browse, create, edit, and manage events**, subscribe to newsletters, and handle **authentication via tokens** — all wrapped in a **responsive and elegant interface**

## 🚀 Features

### Frontend

- **Event Management** – Create, edit, delete, and view events using **React Router’s loaders & actions**
- **Data Loading** – Faster page rendering using `defer`, `Await`, and `Suspense`.
- **Authentication** – **Token-based** login and signup with automatic logout when the token expires
- **Newsletter** – Quick newsletter subscription using `useFetcher` with instant toast feedback.
- **Routing** – Nested layouts, URL parameters, and smooth navigation with **React Router**
- **Protected Routes** – Access control based on the **user’s authentication state**
- **Reusable Components** – Shared UI elements like modals, confirmation dialogs, and event cards.
- **Modern Styling** – TailwindCSS with a consistent, mobile-first design
- **Toast Notifications** – Custom-configured **react-hot-toast** for success/error feedback.

<br>

### Backend

- **Node.js + Express** – Prebuilt REST API for event management.
- **JSON File Storage** – Lightweight, and easy to replace with a real database.
- **Full CRUD Endpoints** – Fetching, creating, updating, and deleting events
- **Extensible** – Can be replaced or extended with a real database or a cloud backend

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- **React 19.2.0** (hooks: `useState`, `useRef`, `useEffect`)
- **React Portals** for modal rendering
- **FormData object** for handling the form's event
- **localStorage** for Signup/ Login / Logout
- Implemented routing using React Router (v6+) with:
  - `createBrowserRouter` + `RouterProvider` with **Route Objects**.
  - **Nested routes** & **Layouts** with `<Outlet />`
  - **Index route** (only one per parent)
  - **Navigation**: `<Link>`, `<NavLink>`, `useNavigate`, `redirect`
  - **Dynamic routes** (`:id`) + `useParams`
  - **Query params** with `useSearchParams`
  - **Data APIs**: `loader` (pre‑render data), `action` (mutations), `useLoaderData`, and `useActionData`
  - **useNavigation** for pending UI
  - **<Form>** integrates with actions/URL updates (GET/POST).
  - **useSubmit** and **useFetcher** (navigation vs no navigation)
  - **Error handling** by using `errorElement`, `throw Response`
  - **Delay rendering** by using `<Suspense>`, Await, and defer
- **React Hot Toast** for UI feedback
- **JavaScript(ES6+)**
- **TailwindCSS/Styling**
- **Vite** (for development and build)

---

### 🏗️ Architecture & Patterns

- **Clean Separation**: Components, pages, loaders, actions, and utilities are well-structured.
- **Custom Utilities**: Helpers for **authentication** (like `getTokenDuration()`, `getAuthToken()` and others) and **resolving image URLs** dynamically by `getImageUrl()`.

<br>

#### ⚡Deferred Data Loading:

Implements **progressive data fetching** using React Router’s **defer**, and `<Suspense fallback>` + `<Await resolve={promise}>` to provide faster perceived performance and smoother UX.

- The loader (eventDetailLoader) fetches the selected event immediately and loads the events list in the background:

  ```javascript
  export async function eventDetailLoader({ params }) {
    const id = params.eventId;
    return {
      event: await loadEvent(id), // fetched immediately
      events: loadEvents(), // deferred
    };
  }
  ```

- Inside the EventDetailPage, the `<Suspense>` and `<Await>` components handle loading states separately for each data source:

  ```javascript
  <Suspense fallback={Loading event details...}>
    <Await resolve={event}>
      {(loadedEvent) => <EventItem event={loadedEvent} />}
    </Await>
  </Suspense>

  <Suspense fallback={Loading related events...}>
    <Await resolve={events}>
      {(loadedEvents) => <EventsList events={loadedEvents} />}
    </Await>
  </Suspense>
  ```

---

### 🛠️ Backend

- Node.js
- Express.js for creating REST API endpoints
- JSON files for data storage (events.json)

---

## 📂 Project Structure

### Frontend Structure

```text
event-portal/frontend/
├─ public/
│  ├─ images/
│  │  └─ placeholder-event.png
│  └─ favicon.svg
├─ src/
│  ├─ assets/screenshots/
│  ├─ components/
│  │  ├─ auth/ → AuthForm, LogoutForm
│  │  ├─ events/ → EventForm, EventItem, EventsList, EventsNavigation
│  │  ├─ UI/ → Modal, ConfirmModal
│  │  ├─ MainNavigation, NewsletterSignup, PageContent
│  ├─ lib/
│  │  ├─ actions/ → authActions.js, eventActions.js, newsletterActions.js
│  │  └─ loaders/ → eventLoaders.js
│  ├─ pages/
│  │  ├─ auth/ → Authentication.jsx
│  │  ├─ events/ → EditEvent, EventDetail, Events, EventsRoot, NewEvent
│  │  ├─ Error, Home, Newsletter, Root
│  ├─ util/ → auth.js, http.js, image.js
│  ├─ App.jsx, router.jsx, main.jsx, index.css
│
└─
```

#### ✨ Highlights

- components/ → Reusable UI and feature-based components (auth, events, modals, etc.)
- pages/ → Route-based pages structured by domain (auth, events, root-level)
- lib/ → Centralized actions and loaders for data fetching and mutations (React Router actions/loaders)
- util/ → Shared helper functions (HTTP logic, image utilities, auth helpers)
- assets/ → screenshots
- router.jsx → Centralized route definitions with `createBrowserRouter`

---

## ⚙️ Installation & Usage

### Running Frontend

Clone the repository, install frontend dependencies, and start the frontend server

```bash
git clone git@github.com:smadi2512/event-portal.git
cd event-portal
cd frontend
npm install
npm run dev
```

**Note**: The frontend will run on http://localhost:5173

<br>

### Running Backend

In a new terminal, navigate to the backend directory, install its dependencies, and start the backend server:

```bash
cd backend
npm install
npm start
```

**Note**: The backend will run on http://localhost:3000

---

## 🔐 Authentication Flow

- User **signs up** with email and password for the first time.
- On successful authentication, the backend returns a **JWT token**.
- The token is stored in **localStorage along with an expiration timestamp**.
- `getTokenDuration()` calculates the remaining time → **auto-logout** when expired.
- `getAuthToken()` retrieves the token for **protected actions and routes** (like creating or editing events).
- Routes are conditionally rendered based on token presence — ensuring secure access control.

---

## 📸 Screenshots

<table align="center">
  <tr>
    <td>
      <h4 align="center">Event Portal Home page</h4>
      <img src="./frontend/src/assets/screenshots/home.png" alt="Home page" width="300" />
    </td>
    <td>
      <h4 align="center">Event Portal Login page</h4>
      <img src="./frontend/src/assets/screenshots/login.png" alt="Login page" width="300"/>
    </td>
    <td>
      <h4 align="center">Event Portal with no events</h4>
      <img src="./frontend/src/assets/screenshots/no-events.png" alt="No events" width="300" />
    </td>
  </tr>
  <tr>
    <td>
      <h4 align="center">Event Portal with events list page</h4>
      <img src="./frontend/src/assets/screenshots/events.png" alt="Events list" width="300" />
    </td>
    <td>
      <h4 align="center">Event Portal with events list on Mobile</h4>
      <img src="./frontend/src/assets/screenshots/events-mobile.png" alt="Events list on mobile" width="300" />
    </td>
    <td>
      <h4 align="center">Event Portal with create new event</h4>
      <img src="./frontend/src/assets/screenshots/add-event.png" alt="Add event" width="300"/>
    </td>
  </tr>
  <tr>
     <td>
      <h4 align="center">Event Portal with event's details</h4>
      <img src="./frontend/src/assets/screenshots/event-details.png" alt="Event's details" width="300"/>
    </td>
    <td>
      <h4 align="center">Event Portal with confirmation delete dialog</h4>
      <img src="./frontend/src/assets/screenshots/confirm-delete-modal.png" alt="Confirm delete modal" width="300"/>
    </td>
    <td>
      <h4 align="center">Event Portal with custom react-hot-toast notification</h4>
      <img src="./frontend/src/assets/screenshots/toast-notification.png" alt="React Hot Toast notification" width="300"/>
    </td>
  </tr>
</table>

---

## 🧩 Future Improvements

- Enhanced token security with **HttpOnly cookies + in-memory access tokens**
- Role-based access control (admin vs. user).
- Event categorization + sorting by date/location
- Multi-language (i18n) support.
- Add Jest + React Testing Library for testing.
- Smooth animations with Framer Motion

---

## 👩‍💻 Author

Created by **Walaa Smadi** ✨ \
Passionate React developer building modern, maintainable, scalable, performant, and user-friendly web apps.

- Email: [walasmadi93@gmail.com](mailto:walasmadi93@gmail.com)
- LinkedIn: [Walaa Smadi](https://www.linkedin.com/in/walaa-bilal-smadi/)
- GitHub: [@smadi2512](https://github.com/smadi2512)

Feel free to fork, star ⭐, and contribute!
