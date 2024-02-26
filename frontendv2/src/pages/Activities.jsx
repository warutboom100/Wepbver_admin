import React from 'react';
import TitleCard from './components/Cards/TitleCard';
import { useEffect, useState ,useRef} from "react";
import axios from 'axios';
import LeftSidebar from "./components/LeftSidebar"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';
import SearchBar from "./components/Cards/SearchBar";
import Header from "../containers/Header"

function Activities() {
    const [poke, setPoke] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const mainContentRef = useRef(null);
    useEffect(() => {
        let abortController = new AbortController();
        const loadPoke = async () => {
          try {
      setLoading(true);
            let response = await axios.get(`https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/WKa9BnJm-MovementEvent/ActivityGet`, {
              signal: abortController.signal
            });
    
            setPoke(response.data);
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

    // console.log(poke);
    const removeFilter = () => {
        
    }

    const applyFilter = (params) => {
        
    }

    // Search according to name
    const applySearch = (value) => {
        
    }
    const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

        const [filterParam, setFilterParam] = useState("");
        const [searchText, setSearchText] = useState("");
        const locationFilters = ["Name", "Location"];

        const showFiltersAndApply = (params) => {
            applyFilter(params);
            setFilterParam(params);
        };

        const removeAppliedFilter = () => {
            removeFilter();
            setFilterParam("");
            setSearchText("");
        };
    
        
        useEffect(() => {
            if(searchText == ""){
                removeAppliedFilter()
            }else{
                applySearch(searchText)
            }
        }, [searchText])
        return (
            <div className="inline-block float-right">
                <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
                {filterParam !== "" && <button onClick={() => removeAppliedFilter()} className="btn btn-xs mr-2 btn-active btn-ghost normal-case">{filterParam}<XMarkIcon className="w-4 ml-2" /></button>}
                <div className="dropdown dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn btn-sm btn-outline"><FunnelIcon className="w-5 mr-2" />Filter</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52">
                        {
                            locationFilters.map((l, k) => {
                                return <li key={k}><a onClick={() => showFiltersAndApply(l)}>{l}</a></li>;
                            })
                        }
                        <div className="divider mt-0 mb-0"></div>
                        <li><a onClick={() => removeAppliedFilter()}>Remove Filter</a></li>
                    </ul>
                </div>
            </div>
        );
    };

    // Pass the required props to TitleCard
    return (
        <>
          <div className="drawer  lg:drawer-open">
            <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex flex-col ">
                <Header />
                <main className="flex-1 overflow-y-auto md:pt-4 pt-3 px-3  bg-base-200" ref={mainContentRef}>
                <TitleCard
                    title="ประวัติการปฏิบัติภารกิจ"
                    topMargin="mt-2"
                    TopSideButtons={<TopSideButtons
                        applySearch={applySearch}
                        applyFilter={applyFilter}
                        removeFilter={removeFilter}
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
                            
                            
                        </tr>
                        </thead>
                        <tbody>
                  {poke.filtered_items && poke.filtered_items.map((object, index) => (
                    <tr key={index}>
                        
                      <td><div className="flex items-center space-x-3">
                                <div className="avatar placeholder">
                                  <div className="bg-blue-200 text-neutral-content rounded-full w-8">
                                    <span>{"ID"}</span>
                                  </div>
                                </div>
                                <div>
                                  <div className="font-bold">{object.Activeby}</div>
                                  
                                </div>
                              </div></td>
                      <td>{object.Case_id}</td>
                      <td>{object.Details.Destination}</td>
                      <td>{object.Activetime}</td>
                      <td>{object.Starttime}</td>
                      <td>{object.Finishtime}</td>
                      
                      
                    </tr>
                  ))}
                </tbody>
                    </table>
                </div>
                </TitleCard>
                </main>
              </div>
              <LeftSidebar />
          </div>
            
        </>
    );
}

export default Activities;
