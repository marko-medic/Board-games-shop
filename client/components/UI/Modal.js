import React from "react";

function Modal({ title, text, closeModal, submitModalHandler }) {
  return (
    <div className="custom-modal">
      <div className="modal-content">
        <h4>{title}</h4>
        <p>{text}</p>
        <div className="buttons">
          <div onClick={submitModalHandler} className="btn">
            YES
          </div>
          <div onClick={closeModal} className="btn">
            NO
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-modal {
          text-align: center;
          background: #2b2b2bf0;
          color: white;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
        }
        .modal-content {
          position: fixed;
          border: 1px solid white;
          padding: 2rem;
          border-radius: 5px;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}

export { Modal };
