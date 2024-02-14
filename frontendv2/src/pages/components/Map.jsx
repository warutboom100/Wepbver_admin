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
      case 'Critical Emergency':
        if(activeby == '-'){
          return '#DA483B';
        }
          
        else {
          return '#B8E0E3';
        }

      case 'High Priority':
        if(activeby == '-'){
          return '#FF9E0F';
        }
          
        else {
          return '#B8E0E3';
        } // Yellow
      case 'Medium Priority':
        if(activeby == '-'){
          return '#FFC718';
        }
          
        else {
          return '#B8E0E3';
        }e
      case 'Low Priority':
        if(activeby == '-'){
          return '#1CA45C';
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
    <TitleCard title="Building Map" topMargin="mt-2">
      <div className="grid grid-cols-4 gap-4">
        {orderData ? (
          orderData.map((room) => (
            <div
              key={room.id}
              className={`p-4 border cursor-pointer ${selectedRoom === room.Details.StartPoint ? 'bg-blue-200' : ''}`}
              style={{ backgroundColor: getBackgroundColor(room.Details.Priority,room.Activeby) }}
              onClick={() => handleRoomClick(room.Details.StartPoint, room)}
              onMouseEnter={() => handleMouseEnter(room.Details.StartPoint)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-lg font-semibold">{room.Details.Destination}</p>
              <p className={`text-sm ${room.Details.Priority === 'Occupied' ? 'text-red-500' : 'text-white'}`}>
                Case Id: {room.Case_id}
              </p>
              {userInRoom && userInRoom.roomId === room.Details.StartPoint && (
                <p className="text-sm text-black">CLICK FOR DETAILS</p>
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
