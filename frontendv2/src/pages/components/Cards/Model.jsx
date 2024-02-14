import React, { useEffect, useState } from 'react';
import './Modal.css'; // Import your CSS file for styling

const Modal = ({ open, onClose, onSubmit }) => {
  const initialFormData = {
    patientFirstName: '',
    patientLastName: '',
    service: 'Urgent Care',
    priority: 'Critical Emergency',
    startpoint: '',
    destination: '',
    note: '',
    stretcher: false,
    wheelchair: false,
    walker: false,
    oxygenTank: false,
    infusionPump: false,
    other: false,
  };
  const [formData, setFormData] = useState({
    patientFirstName: '',
    patientLastName: '',
    service: 'Urgent Care',
    priority: 'Critical Emergency',
    startpoint: '',
    destination: '',
    note: '',
    stretcher: false,
    wheelchair: false,
    walker: false,
    oxygenTank: false,
    infusionPump: false,
    other: false,
  });

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    handleReset();
  };

  const handleClose = () => {
    handleReset(); // Reset the form data when closing the modal
    onClose();
  };

  if (!open) return null;

  return (
    <div onClick={handleClose} className="overlay">
  <div
    onClick={(e) => {
      e.stopPropagation();
    }}
    className="modalContainer"
  >
    <div className="modal-box p-6">
      <form onSubmit={handleSubmit}>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>✕</button>
        <h1 className="font-semibold text-2xl pb-6 text-center">Create a new job</h1>
        <h1 className="font-semibold text-md pb-6 mt-4">Details</h1>
        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2">👤</span> Patient
            </span>
            </label>
            <input type="text" placeholder="Firstname" name="patientFirstName" value={formData.patientFirstName} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" />
          </div> 
          <div className="form-control">
            <label className="label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2"></span>
            </span>
            </label>
            <input type="text" placeholder="Lastname" name="patientLastName" value={formData.patientLastName} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" />
          </div> 
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content undefined">
              <span className="mr-2">🎯</span>From
              </span>
            </label>
            <input type="text" placeholder="Pick up at"  name="startpoint" value={formData.startpoint} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" />
          </div>

          <div className="form-control">
            <label className="label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2"></span>Move To
            </span>
            </label>
            <input type="text" placeholder="Destination" name="destination" value={formData.destination} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" />
          </div> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content undefined">
              <span className="mr-2">🚨</span> Priority
              </span>
            </label>
            <select className="select select-bordered select-info" name="priority" value={formData.priority} onChange={handleChange}>
              <option>Critical Emergency</option>
              <option>High Priority</option>
              <option>Medium Priority</option>
              <option>Low Priority</option>
              
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content undefined">
              <span className="mr-2">📅</span> Service
              </span>
            </label>
            <select className="select select-bordered select-info" name="service" value={formData.service} onChange={handleChange}>
              <option>Urgent Care</option>
              <option>Emergency Services</option>
              <option>Routine Care</option>
              <option>Outpatient Services</option>
              <option>Scheduled appointments</option>
              <option>Diagnostic Services </option>
              <option>Extended Care</option>
              <option>Walk-In Services</option>
            </select>
          </div>
        </div>
        

        {/* Error Messages Section */}
        <p className="text-center text-error mt-9"></p>

        {/* Equipments Section */}
        <h1 className="font-semibold text-md pb-6 mt-4">Equipments</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="form-control">
            <label className="cursor-pointer label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2">🛌</span> Stretcher
            </span>
            <input type="checkbox"  className="checkbox checkbox-info" name="stretcher" checked={formData.stretcher} onChange={handleChange}/>
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2">♿️</span> Wheelchair
            </span>
              <input type="checkbox"  className="checkbox checkbox-info" name="wheelchair" checked={formData.wheelchair} onChange={handleChange}/>
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2">🚶‍♂️</span> Walker
            </span>
              <input type="checkbox"  className="checkbox checkbox-info" name="walker" checked={formData.walker} onChange={handleChange}/>
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2">⛽️</span> OxygenTank
            </span>
              <input type="checkbox"  className="checkbox checkbox-info" name="oxygenTank" checked={formData.oxygenTank} onChange={handleChange}/>
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2">💉</span> InfusionPump
            </span>
              <input type="checkbox"  className="checkbox checkbox-info" name="infusionPump" checked={formData.infusionPump} onChange={handleChange}/>
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2">🔄</span> Other
            </span>
              <input type="checkbox"  className="checkbox checkbox-info" name="other" checked={formData.other} onChange={handleChange}/>
            </label>
          </div>

        </div>
        
        {/* Additional Error Messages Section */}
        <p className="text-center text-error mt-6"></p>
        <input type="text" placeholder="NOTE" className="input input-bordered input-lg w-full max-w-xs mt-4" name="note" checked={formData.note} onChange={handleChange}/>

        {/* Modal Actions Section */}
        <div className="modal-action flex justify-end mt-4">
          <button className="btn btn-ghost mr-2" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary px-6" onClick={handleSubmit} type="submit">
            Confirm
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Modal;
