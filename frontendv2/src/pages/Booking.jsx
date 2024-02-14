import { useState, useEffect } from 'react';
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

  const getDummyStatus = (index) => {
        if(index === "Available")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-white text-gray-600">Available</div>
        else if(index === "In Progress")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-blue-600 text-white dark:bg-blue-500">In Progress</div>
        else if(index  === "Completed")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-teal-500 text-white">Completed</div>
        else if(index  === "Declined")return <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xm font-medium bg-gray-800 text-white dark:bg-white dark:text-gray-800">Declined</div>
        else return <div className="badge badge-ghost">Loading...</div>
  }
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
    };
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
    
      <TitleCard title="Current Tasks" topMargin="mt-2" TopSideButtons={<TopSideButtons onRefresh={() => setRefresh(!refresh)} pokeTotal={poke.total} />}>
        <Modal open={ConfirmModel} onClose={() => setConfirmModel(false)} onSubmit={handleSubmit}/>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Location</th>
                <th>Patient Name</th>
                <th>Equipments</th>
                <th>Created At</th>
                <th>Status</th>
                <th>Active By</th>
                
              </tr>
            </thead>
            
            <tbody>
              {poke.body && poke.body.map((object, index) => (
                <tr key={index}>
                  
                  <td>
                  <div class="flex items-center space-x-3">
                    <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span>AM</span>
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{object.Case_id}</div>
                    </div>
                  </div>
                  </td>
                  <td>{object.Details.StartPoint+" --> "+object.Details.Destination}</td>
                  <td>{object.Details.PatientName}</td>
                  <td>
                  <ul>
                    {Object.entries(object.Equipments).map(([equipment, quantity]) => (
                      <li key={equipment}>
                        {`${equipment}: ${quantity}`}
                      </li>
                    ))}
                  </ul>

                  </td>
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
    </>
  );
}

export default Booking;
