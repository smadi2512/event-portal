import Modal from "./Modal";

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title = "Confirm Delete",
  message = "Are you sure?",
}) {
  //Confirm Modal actions
  const actions = (
    <div className="flex gap-4 justify-center w-full">
      <button
        onClick={onConfirm}
        className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-700 hover:to-red-800 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-red-500/20 border border-red-500/30 flex items-center gap-2 flex-1 justify-center"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </button>
      <button
        onClick={onCancel}
        className="cursor-pointer px-6 py-3 rounded-xl border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-500 hover:text-white hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-0.5 flex-1"
      >
        Cancel
      </button>
    </div>
  );
  return (
    <Modal open={isOpen} title={title} actions={actions}>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed">{message}</p>
      </div>
    </Modal>
  );
}
