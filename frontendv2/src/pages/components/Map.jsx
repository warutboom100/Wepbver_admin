import React, { useState } from 'react';
import TitleCard from './Cards/TitleCard';
import ShopOrderTrackingModal from './Cards/ShopOrderTrackingModal';


function Map({ orderData }) {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userInRoom, setUserInRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const handleRoomClick = (roomId, orderDetails) => {
    setSelectedRoom(roomId);
    setSelectedOrder(orderDetails);
    setShowModal(true);
  };

  const handleMouseEnter = (roomId) => {
    const userInRoom = getUserInRoom(roomId);
    setUserInRoom(userInRoom);
  };

  const handleMouseLeave = () => {
    setUserInRoom(null);
  };

  const getUserInRoom = (roomId) => {
    return { roomId, username: 'John Doe' };
  };

  const getBackgroundColor = (priority,activeby) => {
    switch (priority) {
      case '0':
        if(activeby == '-'){
          return '#FF6A5D';
        }
          
        else {
          return '#B8E0E3';
        }

      case '1':
        if(activeby != '-'){
          return '#FFAE34';
        }
          
        else {
          return '#B8E0E3';
        } // Yellow
      case '2':
        if(activeby != '-'){
          return '#FFD760';
        }
          
        else {
          return '#B8E0E3';
        }e
      case '3':
        if(activeby != '-'){
          return '#40D184';
        }
          
        else {
          return '#B8E0E3';
        }
      default:
        return '#B8E0E3'; // Gray
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <TitleCard title="ติดตามสถานะภารกิจ" topMargin="mt-2">
      <div className="grid grid-cols-3 gap-4 overflow-auto max-h-[400px]">
        {orderData ? (
          orderData.map((room) => (
            <div
              key={room.id}
              className={`p-4 border cursor-pointer flex flex-col justify-center items-center ${selectedRoom === room.Details.StartPoint ? 'bg-blue-200' : ''}`}
              style={{ backgroundColor: getBackgroundColor(room.Details.Step, room.Activeby) }}
              onClick={() => handleRoomClick(room.Details.StartPoint, room)}
              onMouseEnter={() => handleMouseEnter(room.Details.StartPoint)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-lg font-semibold text-center">{room.Case_id}</p>
              <p className={`text-sm ${room.Details.Priority === 'Occupied' ? 'text-red-500' : 'text-white'}`}>
                {room.Details.Destination}
              </p>
              {userInRoom && userInRoom.roomId === room.Details.StartPoint && (
                <p className="text-sm text-black">คลิ๊กเพื่อดูสถานะ</p>
              )}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {showModal && (
        <ShopOrderTrackingModal onClose={closeModal} orderDetails={selectedOrder} />
      )}
    </TitleCard>
  );
}

export default Map;
