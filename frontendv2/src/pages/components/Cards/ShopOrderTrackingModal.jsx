
import React from 'react';
import check from '../../../assets/check.png';
import failed from '../../../assets/failed.png';
import telemedicine from '../../../assets/telemedicine.png';
import disabled from '../../../assets/disabled.png';
import partnership from '../../../assets/partnership.png';
import commit from '../../../assets/commit.png';

const StepItem = ({ color, icon, title, description ,imgstep}) => (
  <div className={`flex md:contents`}>
    <div className={`col-start-2 col-end-4 mr-10 md:mx-auto relative`}>
      <div className={`h-full w-6 flex items-center justify-center`}>
        <div className={`h-full w-1 ${color === 'green-500' ? 'bg-green-500' : 'bg-gray-300'} pointer-events-none`}></div>
      </div>
      <div className={`w-6 h-6 absolute top-1/2 -mt-3 rounded-full ${color === 'green-500' ? 'bg-green-500' : 'bg-gray-300'} shadow text-center`}>
        <img src={icon}></img>
      </div>
    </div>
    <div className={`bg-${color === 'green-500' ? 'green-500' : 'gray-300'} col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full flex items-center`}>
      <img src={imgstep} className="mr-4" style={{ width: '48px', height: '48px' }} alt="icon" />
      <div>
        <h3 className={`font-semibold text-lg mb-1`}>{title}</h3>
        <p className={`leading-tight text-justify w-full`}>{description}</p>
      </div>
      
    </div>

  </div>
);
const ShopOrderTrackingModal = ({ onClose, orderDetails }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white p-8 rounded-lg shadow-md relative max-w-3xl w-full">
          <span className="absolute top-2 right-2 text-lg cursor-pointer" onClick={onClose}>&times;</span>
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">ติดตามภารกิจ {orderDetails.Case_id}</h2>
          <div className="p-4 mt-4">
            <div className="container">
              <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
                <StepItem
                  color={Number(orderDetails.Details.Step)>0 ? 'green-500' : 'gray-300'}
                  icon={Number(orderDetails.Details.Step)>0 ? check : null}
                  title={"รับภารกิจโดย คุณ "+orderDetails.Activeby}
                  description={orderDetails.Activeby === "-"? 'เวลา -':'เวลา '+orderDetails.Active_time}
                  imgstep={telemedicine}
                />
                <StepItem
                  color={Number(orderDetails.Details.Step)>1 ? 'green-500' : 'gray-300'}
                  icon={Number(orderDetails.Details.Step)>1 ? check : null}
                  title={"รับคุณ ["+orderDetails.Details.PatientHN+"]"+orderDetails.Details.PatientName}
                  description={'เวลา '+orderDetails.Pickup_time}
                  imgstep={disabled}
                />
                <StepItem
                  color={Number(orderDetails.Details.Step)>2 ? 'green-500' : 'gray-300'}
                  icon={Number(orderDetails.Details.Step)>2 ? check : null}
                  title={"ส่งผู้ป่วยที่ "+orderDetails.Details.Destination}
                  description={'เวลา '+orderDetails.Delivery_time}
                  imgstep={partnership}
                />
                <StepItem
                  color={Number(orderDetails.Details.Step)>3 ? 'green-500' : 'gray-300'}
                  icon={Number(orderDetails.Details.Step)>3 ? check : null}
                  title="ส่งผู้ป่วยถึงจุดหมายเรียบร้อย"
                  description="รอยืนยันจบภารกิจ"
                  imgstep={commit}
                />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

  

export default ShopOrderTrackingModal;
