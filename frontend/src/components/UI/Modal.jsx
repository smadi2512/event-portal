import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, title, children, actions = "" }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  function handleClose() {
    dialogRef.current.close();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      aria-modal="true"
      role="dialog"
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-[#d4af37] rounded-2xl p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
      style={{
        margin: "auto",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      {!open && null}
      {open && (
        <div className="relative">
          {/* Close Button */}
          <button
            aria-label="Close modal"
            onClick={handleClose}
            className="cursor-pointer absolute top-4 right-4 z-10 w-8 h-8 bg-gray-800 border border-[#d4af37] text-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-all duration-300 transform hover:scale-110"
          >
            ×
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] p-1">
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent text-center">
                {title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">{children}</div>

          {/* Actions buttons */}
          <div className="border-t border-gray-700 bg-gray-900/50 p-6">
            <form
              method="dialog"
              id="modal-actions"
              className="flex gap-4 justify-center items-center"
            >
              {actions ? (
                actions
              ) : (
                <button
                  formMethod="dialog"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black font-semibold hover:from-[#f4d03f] hover:to-[#d4af37] transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Close
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </dialog>,
    document.getElementById("modal")
  );
}
