import TitleCard from './Cards/TitleCard';
import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';


function UserChannels({User}){
    const getDummyStatus = (index) => {
        if(index === "Available")return <div className="inline-flex items-center py-1.2 px-2 rounded-full text-xm font-medium bg-blue-400 text-white">รองาน</div>
        else if(index === "Active")return <div className="inline-flex items-center py-1.2 px-2  rounded-full text-xm font-medium bg-red-600 text-white dark:bg-blue-500">กำลังทำงาน</div>
        else return <div className="badge badge-ghost">Loading...</div>
  }
    return(
        <TitleCard title={"สถานะของเจ้าหน้าที่"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">ชื่อเจ้าหน้าที่</th>
                        <th className="normal-case">สถานะ</th>
                        <th className="normal-case">เวลางานล่าสุด</th>
                    </tr>
                    </thead>
                    <tbody>
                    {User && User.map((object, index) => (
                        <tr key={index}>
                        <th>{index+1}</th>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content rounded-full w-8">
                                <span>{object.Firstname}</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{object.Firstname}</div>
                              <div className="text-sm opacity-50">{object.Lastname}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td>{getDummyStatus(object.Status)}</td>
                        <td>{object.Timestamp}</td>
                  
                </tr>
              ))}
            </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels