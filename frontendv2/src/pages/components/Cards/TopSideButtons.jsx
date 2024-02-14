import React, { useState, useEffect } from 'react';
import Modal from './Model';
import axios from 'axios';

function getCurrentDateTime() {
  const now = new Date();
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Use 24-hour format
  };
  return now.toLocaleString('en-US', options);
}

function TopSideButtons({ onRefresh ,pokeTotal }) {
  const [openModel, setOpenModel] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleSubmit = async (form) => {
    try {
     
  
      const dateTime = getCurrentDateTime();
      const response = await axios.post(
        `https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/CS3Rt7Cz-Case/addCase`,
        {
          // POST request payload
          httpMethod: 'POST',
          type: 'Create',
          body: {
            Case_id: `ER-${pokeTotal + 1}`,
            Details: {
              PatientName: form.patientFirstName+" "+form.patientLastName,
              Service: form.service,
              Priority: form.priority,
              StartPoint: form.startpoint,
              Destination: form.destination,
              Note: form.note,
              Step: "0",
            },
            Equipments: {
              Infusionpump: form.infusionPump,
              Oxygentank: form.oxygenTank,
              Stretcher: form.stretcher,
              Walker: form.walker,
              Wheelchair: form.wheelchair,
              Other: form.other,
            },
            CreatedAt: dateTime,
            Timestamp: dateTime,
            Activeby: '-',
            Activetime: '-',
            Starttime: '-',
            Finishtime: '-',
            Status: 'Available',
          },
        }
      );
  
      setData(response.data);
      setError('');
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
      onRefresh(); 
    }
  };

  

  return (
    <div className="inline-block float-right">
      <button
        className="btn px-6 btn-sm normal-case btn-primary"
        onClick={() => setOpenModel(true)}
      >
        Add New
      </button>
      <Modal open={openModel} onClose={() => setOpenModel(false)} onSubmit={handleSubmit}/>
    </div>
  );
}

export default TopSideButtons;
