import TitleCard from './Cards/TitleCard';
import { useEffect, useState } from "react";
import axios from 'axios';
import React from 'react';


function UserChannels({User}){
    
    return(
        <TitleCard title={"User Location"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Name</th>
                        <th className="normal-case">Status</th>
                        <th className="normal-case">Recent Location</th>
                    </tr>
                    </thead>
                    <tbody>
                    {User && User.map((object, index) => (
                        <tr key={index}>
                        <th>{index+1}</th>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div className="avatar placeholder">
                              <div className="bg-neutral text-neutral-content rounded-full w-8">
                                <span>{object.Firstname}</span>
                              </div>
                            </div>
                            <div>
                              <div class="font-bold">{object.Firstname}</div>
                              <div class="text-sm opacity-50">{object.Lastname}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td>{object.Status}</td>
                        <td>{object.Location}</td>
                  
                </tr>
              ))}
            </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels