import { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import TitleCard from './components/Cards/TitleCard';
import TopSideButtons from './components/Cards/TopSideButtons';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import Modal from './components/Cards/Model_del';

function Booking() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [Data, setData] = useState("");

  const [ConfirmModel, setConfirmModel] = useState(false);
  const [IndexData, setIndexData] = useState(0);
  const mainContentRef = useRef(null);
  const getDummyStatus = (index) => {
        if(index === "Available")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-light text-gray-600">รอรับงาน</div>
        else if(index === "In Progress")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-blue-600 text-white dark:bg-blue-500">กำลังดำเนินการ</div>
        else if(index  === "Completed")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-teal-500 text-white">งานเสร็จสิ้น</div>
        else if(index  === "Declined")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-gray-800 text-white dark:bg-white dark:text-gray-800">ยกเลิกงาน</div>
        else return <div className="badge badge-ghost">Loading...</div>
  }
  const title_equ = (equipments) =>{
    if (equipments.Stretcher1 === true) {
      return "รถนอน พร้อมเจ้าหน้าที่ 1 ท่าน";
    } else if (equipments.Stretcher2 === true) {
      return "รถนอน พร้อมเจ้าหน้าที่ 2 ท่าน";
    }else if (equipments.Staff1 === true) {
      return "เจ้าหน้าที่ 1 ท่าน";
    }else if (equipments.Staff2 === true) {
      return "เจ้าหน้าที่ 2 ท่าน";
    }else if (equipments.Wheelchair === true) {
      return "รถนั่งเจ้าหน้าที่ 1";
    } else {
      return "อื่นๆ";
    }
  };

  const handleSubmit = async () => {
    
    try {
      const response = await axios.delete(
        'https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/CS3Rt7Cz-Case/deleteCase',
        {
          headers: {
            'Content-Type': 'application/json', // Set the correct content type
          },
          data: {
            httpMethod: 'DELETE',
            type: 'Delete_case',
            body: {
              Case_id: IndexData,
            },
          },
        }
      );
  
      setData(response.data);
      setError('');
    } catch (error) {
      setError('Something went wrong');
      // console.log(error);
    } finally {
      setLoading(false);
      setRefresh(!refresh);
      // console.log('DONE');
    }
  };
  
  useEffect(() => {
    let abortController = new AbortController();
    const loadPoke = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/CS3Rt7Cz-Case/getCase`, {
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
  }, [refresh]);
  
  return (
    <>
      <div className="drawer  lg:drawer-open">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col ">
  
          <main className="flex-1 overflow-y-auto md:pt-4 pt-3 px-3  bg-base-200" ref={mainContentRef}>
            <TitleCard title="ภารกิจงานเคลื่อนย้าย" topMargin="mt-2" TopSideButtons={<TopSideButtons onRefresh={() => setRefresh(!refresh)} pokeTotal={poke.total} pokeStaff={poke.staff}/>}>
              <Modal open={ConfirmModel} onClose={() => setConfirmModel(false)} onSubmit={handleSubmit}/>
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>JOB ID</th>
                      <th>สถานที่</th>
                      <th>ชื่อผู้ป่วย</th>
                      <th>ประเภทการขอ</th>
                      <th>ภารกิจสร้างเมื่อ</th>
                      <th>สถานะภารกิจ</th>
                      <th>เจ้าหน้าที่</th>
                      <th></th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {poke.body && poke.body.map((object, index) => (
                      <tr key={index}>
                        
                        <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar placeholder">
                          <div className="bg-blue-200 text-neutral-content rounded-full w-8">
                            <span>ID</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{object.Case_id}</div>
                          </div>
                        </div>
                        </td>
                        <td>{object.Details.StartPoint+" → "+object.Details.Destination}</td>
                        <td>{"["+object.Details.PatientHN+"] "+object.Details.PatientName}</td>
                        <td>{title_equ(object.Equipments)}</td>
                        <td>{object.Timestamp}</td>
                        <td>{getDummyStatus(object.Status)}</td>
                        <td>{object.Activeby}</td>
                        <td><button className="btn btn-square btn-ghost" onClick={() => {setConfirmModel(true);setIndexData(poke.body[index].Case_id);}}><TrashIcon className="w-5"/></button></td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          
            </TitleCard>
          </main>
        </div>
        {/* <LeftSidebar/> */}
      </div>
      
    </>
  );
}

export default Booking;
