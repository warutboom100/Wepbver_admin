import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import LineChart from './components/LineChart'
import Map from './components/Map'
import BarChart from './components/BarChart'
import UserChannels from './components/UserChannels'
import DoughnutChart from './components/DoughnutChart'

import React from 'react'
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'

import { useEffect, useState } from "react";
import axios from 'axios';


function Dashboard() {
  const [poke, setPoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
        let abortController = new AbortController();
        const loadPoke = async () => {
          try {
            setLoading(true);
            let response = await axios.get(`https://ik25o0qwj7.execute-api.ap-southeast-1.amazonaws.com/wepapp_admin/65xE4EmF-Employee/Get_Userlocation`, {
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
  const statsData = [
    {title : "Available Users", value : poke.DashboardStats?.AvailableUsers || 0, icon : <UserGroupIcon className='w-8 h-8'/>, description : poke.DashboardStats?.totalUsers + " all users"},
    {title : "All Tasks", value : poke.DashboardStats?.AllTasks || 0, icon : <CreditCardIcon className='w-8 h-8'/>, description : "Current month"},
    {title : "Pending Tasks", value : poke.DashboardStats?.PendingTasks || 0, icon : <CircleStackIcon className='w-8 h-8'/>, description : poke.DashboardStats?.PendingTasks+ " out of " +poke.DashboardStats?.AllTasks},
    {title : "Active Users", value : poke.DashboardStats?.ActiveUsers || 0, icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
  ]
  return (
    <>
    <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
    </div>
    <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <Map orderData={poke.BuildingMap} />
        <BarChart />
    </div>
    <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats availableUsers={poke.AmountStats?.UserTopScore} Score={poke.AmountStats?.Score}/>
        <PageStats Pop={poke.PageStats?.PopularLocation} Used={poke.PageStats?.Totalused}/>
    </div>
    <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <UserChannels User ={poke.UserChannels}/>
        <DoughnutChart Donut ={poke.DoughnutChart}/>
    </div>
    </>
  )
}

export default Dashboard