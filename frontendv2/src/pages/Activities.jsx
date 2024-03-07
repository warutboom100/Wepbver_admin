import React from 'react';
import TitleCard from './components/Cards/TitleCard';
import { useEffect, useState ,useRef} from "react";
import axios from 'axios';
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import SearchBar from "./components/Cards/SearchBar";
import './Table.css';

function Activities() {
    const [poke, setPoke] = useState("");
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const mainContentRef = useRef(null);
    const [filterParam, setFilterParam] = useState("");
    useEffect(() => {
        let abortController = new AbortController();
        const loadPoke = async () => {
          try {
            setLoading(true);
            let response = await axios.get(`https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/WKa9BnJm-MovementEvent/ActivityGet`, {
              signal: abortController.signal
            });
    
            setPoke(response.data.filtered_items);
            setData(response.data.filtered_items);
            setError("");
          } catch (error) {
            setError("Something went wrong", error);
          } finally {
            setLoading(false);
          }
        }
        loadPoke();
       
        return () => abortController.abort();
    }, []);

    
    const removeFilter = () => {
      setData(poke);
    }

    const applyFilter = (params) => {
        if (params === 'ภารกิจเสร็จสิ้น') {
          
            const filteredData = poke.filter(item => item.Status === "Completed");
            setData(filteredData);
            
        } else if (params === 'ยกเลิกภารกิจ') {
            const filteredData = poke.filter(item => item.Status === "Declined");
            setData(filteredData);
        } else {
          
          setData(poke);
          
        }
       
    }


    // Search according to name
    const applySearch = (value) => {
        
    }
    const getBackgroundColor = (object) => {
      if (object === 'Completed') {
        return 'bg-green-100'; // Green background for Completed
      } else if (object === 'Declined') {
        return 'bg-red-100'; // Red background for Declined
      } else {
        return ''; // Default background if no status matches
      }
    };

    const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
        const [searchText, setSearchText] = useState("");
        const locationFilters = ["ภารกิจเสร็จสิ้น", "ยกเลิกภารกิจ"];

        const showFiltersAndApply = (params) => {
          
            applyFilter(params);
            setFilterParam(params);
        };

        const removeAppliedFilter = () => {
            removeFilter();
            setFilterParam("");
            
            
        };


        return (
            <div className="inline-block float-right" style={{ zIndex: '999' }}>
                {filterParam !== "" && (
                  <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">
                    {filterParam}<XMarkIcon className="w-4 ml-2" />
                  </button>
                )}

                <div className="dropdown dropdown-bottom dropdown-end" style={{ zIndex: '10' }}> {/* กำหนด z-index ที่สูงกว่า */}
                    <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />กรองข้อมูล</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                        {
                            locationFilters.map((l, k) => {
                                return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>;
                            })
                        }
                        <div className="divider mt-0 mb-0"></div>
                        <li><a onClick={() => removeAppliedFilter()}>ลบกรองข้อมูล</a></li>
                    </ul>
                </div>
            </div>

          );
        };


   
    return (
        <>
          <div className="drawer lg:drawer-open">
  <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    <main className="flex-1 overflow-y-auto md:pt-4 pt-3 px-3 bg-base-200" ref={mainContentRef}>
      <TitleCard
        title="ประวัติการปฏิบัติภารกิจ"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons
          filterParam={filterParam}
          removeFilter={removeFilter}
          applyFilter={applyFilter}
          applySearch={applySearch}
        />}
      >
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>รหัสเจ้าหน้าที่</th>
                <th>JOB Id</th>
                <th>ปลายทาง</th>
                <th>เวลารับภารกิจ</th>
                <th>เวลารับผู้ป่วย</th>
                <th>เวลาส่งผู้ป่วย</th>
                <th>หมายเหตุยกเลิก</th>
              </tr>
            </thead>
            <tbody>
            {data && data.map((object, index) => (
              <tr key={index} className={getBackgroundColor(object.Status)}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar placeholder">
                      <div className="bg-blue-200 text-neutral-content rounded-full w-8">
                        <span>ID</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{object.Activeby}</div>
                    </div>
                  </div>
                </td>
                <td>{object.Case_id}</td>
                <td>{(object.Details.Destination.length > 30 ? `${object.Details.Destination.slice(0, 30)}...` : object.Details.Destination)}</td>
                <td>{object.Active_time}</td>
                <td>{object.Pickup_time}</td>
                <td>{object.Delivery_time}</td>
                <td>{object.Declined}</td>
              </tr>
            ))}
          </tbody>

          </table>
        </div>
      </TitleCard>
    </main>
  </div>
</div>

            
        </>
    );
}

export default Activities;
