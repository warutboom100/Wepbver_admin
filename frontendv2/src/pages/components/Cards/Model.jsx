import React, { useEffect, useState } from 'react';
import './Modal.css'; // Import your CSS file for styling

import patient from '../../../assets/patient.png'


const Modal = ({ open, onClose, onSubmit,pokeStaff }) => {
  const initialFormData = {
    patientHN: '',
    patientName: '',
    staff: '-',
    priority: 'ฉุกเฉิน',
    startpoint: 'จุดรวมพลชั้น1',
    destination: 'จุดรวมพลชั้น1',
    note: '',
    stretcher1: false,
    staff1: false,
    wheelchair: false,
    stretcher2: false,
    staff2: false,
    other: false,
  };
  const [formData, setFormData] = useState({
    patientHN: '',
    patientName: '',
    staff: '-',
    priority: 'ฉุกเฉิน',
    startpoint: 'จุดรวมพลชั้น1',
    destination: 'จุดรวมพลชั้น1',
    note: '',
    stretcher1: false,
    staff1: false,
    wheelchair: false,
    stretcher2: false,
    staff2: false,
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
        <h1 className="font-semibold text-2xl pb-6 text-center">ลงทะเบียนภารกิจ</h1>
        <h1 className="font-semibold text-md pb-6 mt-4">รายละเอียด</h1>
        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
           <div className="label-text text-base-content undefined" style={{ display: 'flex', alignItems: 'center' }}>
              <span className="mr-2">
                <img src={patient} alt="" height="16px" width="16px" />
              </span>
              <span>ข้อมูลผู้ป่วย</span>
            </div>

            </label>
            <input type="text" placeholder="รหัสHN" name="patientHN" value={formData.patientHN} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" />
          </div> 
          <div className="form-control">
            <label className="label">
            <span className="label-text text-base-content undefined">
              <span className="mr-2"></span>
            </span>
            </label>
            <input type="text" placeholder="ชื่อ-นามสกุล" name="patientName" value={formData.patientName} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" />
          </div> 
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content undefined">
              <span className="mr-2">🎯</span>ต้นทาง
              </span>
            </label>
            {/* <input type="text" placeholder="ต้นทาง"  name="startpoint" value={formData.startpoint} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" /> */}
            <select className="select select-bordered select-info" name="startpoint" value={formData.startpoint} onChange={handleChange}>
              <option>จุดรวมพลชั้น1</option>
              <option>ห้องผ่าตัด1</option>
              <option>ห้องผ่าตัด2</option>
              <option>ห้องผ่าตัด3</option>
              <option>ห้องผ่าตัดตา3</option>
              <option>ห้องพักฟื้น RR พร</option>
              <option>ห้องพักฟื้น RR มว</option>
              <option>วอร์ด1</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content undefined">
              <span className="mr-2">🎯</span>ปลายทาง
              </span>
            </label>
            {/* <input type="text" placeholder="ปลายทาง" name="destination" value={formData.destination} onChange={handleChange} className="input input-bordered input-info w-full max-w-md" /> */}
            <select className="select select-bordered select-info" name="destination" value={formData.destination} onChange={handleChange}>
              <option>จุดรวมพลชั้น1</option>
              <option>ห้องผ่าตัด1</option>
              <option>ห้องผ่าตัด2</option>
              <option>ห้องผ่าตัด3</option>
              <option>ห้องผ่าตัดตา3</option>
              <option>ห้องพักฟื้น RR พร</option>
              <option>ห้องพักฟื้น RR มว</option>
              <option>วอร์ด1</option>
            </select>
          </div> 
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content undefined">
              <span className="mr-2">👨‍💼</span> เจ้าหน้าที่

              </span>
            </label>
            <select className="select select-bordered select-info" name="staff" value={formData.staff} onChange={handleChange}>
              <option>-</option>
              {pokeStaff.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>

          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-base-content undefined">
              <span className="mr-2">🚨</span> ระดับความสำคัญ
              </span>
            </label>
            <select className="select select-bordered select-info" name="priority" value={formData.priority} onChange={handleChange}>
              <option>ฉุกเฉิน</option>
              <option>สูง</option>
              <option>ปานกลาง</option>
              <option>ปกติ</option>
              
            </select>
          </div>

          
        </div>
        

        {/* Error Messages Section */}
        <p className="text-center text-error mt-9"></p>

        {/* Equipments Section */}
        <h1 className="font-semibold text-md pb-6 mt-4">ประเภทการขอ</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mt-1">
          <div className="form-control">
            <label className="cursor-pointer label">
            <input type="checkbox"  className="checkbox checkbox-info " name="stretcher1" checked={formData.stretcher1} onChange={handleChange}/>
            <span className="label-text text-base-content undefined">
              <span className="mr-2">🛌</span> รถนอนเจ้าหน้าที่ 1
            </span>
            
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox"  className="checkbox checkbox-info" name="staff1" checked={formData.staff1} onChange={handleChange}/>
            <span className="label-text text-base-content undefined">
              <span className="mr-2">🚶‍♂️</span>เจ้าหน้าที่ 1 ท่าน
            </span>
            
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox"  className="checkbox checkbox-info" name="wheelchair" checked={formData.wheelchair} onChange={handleChange}/>
            <span className="label-text text-base-content undefined">
              <span className="mr-2">♿️</span>รถนั่ง เจ้าหน้าที่ 1
            </span>
              
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox"  className="checkbox checkbox-info" name="stretcher2" checked={formData.stretcher2} onChange={handleChange}/>
            <span className="label-text text-base-content undefined">
              <span className="mr-2">🛌</span> รถนอนเจ้าหน้าที่ 2
            </span>
              
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox"  className="checkbox checkbox-info" name="staff2" checked={formData.staff2} onChange={handleChange}/>
            <span className="label-text text-base-content undefined">
              <span className="mr-2">🚶‍♂️🚶‍♂️</span>เจ้าหน้าที่ 2 ท่าน
            </span>
              
            </label>
          </div>
          <div className="form-control">
            <label className="cursor-pointer label">
            <input type="checkbox"  className="checkbox checkbox-info" name="other" checked={formData.other} onChange={handleChange}/>
            <span className="label-text text-base-content undefined">
             
              <span className="mr-2">🔄 ประเภทขออื่นๆ</span>
            </span>
              
            </label>
          </div>

        </div>
        
        {/* Additional Error Messages Section */}
        <p className="text-center text-error mt-6"></p>
        <input type="text" placeholder="เพิ่มเติม" className="input input-bordered input-lg w-full max-w-xs mt-4" name="note" checked={formData.note} onChange={handleChange}/>

        {/* Modal Actions Section */}
        <div className="modal-action flex justify-end mt-4">
          <button className="btn btn-ghost mr-2" onClick={handleClose}>
            ยกเลิก
          </button>
          <button className="btn btn-primary px-6" onClick={handleSubmit} type="submit">
            สร้างภารกิจ
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );
};

export default Modal;
