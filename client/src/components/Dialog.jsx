const Dialog = ({ id, onClose, children }) => {
  return (
    <dialog id={id} className="dialog" closedby="any">
      <div className="dialog-close">
        <button commandfor={id} command="close" onClick={onClose}>
          X
        </button>
      </div>
      <div>{children}</div>
    </dialog>
  );
};

export default Dialog;
