// ShopOrderTrackingModal.jsx
import React from 'react';

const ShopOrderTrackingModal = ({ onClose, orderDetails }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md relative">
        <span className="absolute top-2 right-2 text-lg cursor-pointer" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Mission Tracking</h2>

        <div className="p-4 max-w-md mx-auto pt-20 flow-root">
          <ul role="list" className="-mb-8">
            <TimelineStep title="Activated" data={orderDetails} isFirst={1} step={Number(orderDetails.Details.Step)} time ={orderDetails.Timestamp}/>
            <TimelineStep title="Received " data={orderDetails} isFirst={2} step={Number(orderDetails.Details.Step)-1} time ={orderDetails.Starttime}/>
            <TimelineStep title="In progress Transported" data={orderDetails} isFirst={3} step={Number(orderDetails.Details.Step)-2}/>
            <TimelineStep title="Patient Delivered" isLast={true} data={orderDetails} isFirst={4} step={Number(orderDetails.Details.Step)-3 } time ={orderDetails.Finishtime}/>
            {/* Add more timeline steps as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

const TimelineStep = ({ title, data, isFirst, isLast ,step,time}) => {
    return (
      <li>
        <div className={`relative pb-8 ${isLast ? '' : 'mb-8'}`}>
          {step>0&&!isLast && <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-green-200" aria-hidden="true"></span>}
          <div className="relative flex space-x-3">
            <div>
              <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${Number(step)>0 ? 'bg-green-500' : 'bg-gray-400'}`}>
                {isLast ? (
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <img className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" src={isLast ? 'https://res.cloudinary.com/teepublic/image/private/s--AwgOGWhQ--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1615488250/production/designs/20135311_0.jpg' : 'https://c8.alamy.com/comp/2RC5DTJ/taking-off-plane-logo-2RC5DTJ.jpg'} alt="Timeline Icon" />
                )}
              </span>
            </div>
            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
              <div>
                <p className="text-sm text-gray-500">{title} <a href="#" className="font-medium text-gray-900">{isLast ? '' : isFirst == 1 ?  `by ${data.Activeby}` : isFirst == 2? `Mr. ${data.Details.PatientName}`:``}</a></p>
              </div>
              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                <time dateTime="2020-09-30">{time}</time>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };
  

export default ShopOrderTrackingModal;
