import React, { useEffect, useState } from 'react';
import './Modal.css'; // Import your CSS file for styling

const Modal1 = ({ open, onClose, onSubmit }) => {


  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEsc, false);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, [open, onClose]);

  const handleClose = () => {
     // Reset the form data when closing the modal
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    onSubmit();
  };
  if (!open) return null;

  return (
    <div onClick={handleClose} className="overlay">
      <div onClick={(e) => {e.stopPropagation();}}className="modalContainer">
      <div className="modal-box p-6">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</button>
        </form>
        <h1 className="font-bold text-lg">Confirmation</h1>
        <p className="py-4">คุณแน่ใจที่จะลบภารกิจใช่หรือไม่?</p>
        <div className="modal-action flex justify-end mt-4">
          <button className="btn btn-ghost mr-2" onClick={handleClose}>
            ยกเลิก
          </button>
          <button className="btn btn-primary px-6" onClick={handleSubmit}  type="submit">
            ใช่
          </button>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Modal1;
