import './index.css';

export const Modal = (props) => {
  const { isVisible, onClose, title, children } = props;

  function closeOnKeydown(event) {
    if (event.key === 'Escape') {
      onClose();
    }
  }

  if (isVisible) {
    document.addEventListener('keydown', closeOnKeydown);
  } else {
    document.removeEventListener('keydown', closeOnKeydown);
  }

  return (
    <div
      className={`Modal__wrapper ${isVisible ? 'visible' : ''}`}
      onKeyDown={(event) => closeModal(event)}
    >
      <div className="Modal">
        <div className="Modal__header">
          <h3 className="Modal__title">{title}</h3>
          <button className="Modal__btn-close" onClick={onClose}>
            ⨉
          </button>
        </div>
        {children && <div className="Modal__body">{children}</div>}
      </div>
    </div>
  );

  function closeModal(event) {
    console.log(event);
  }
};
