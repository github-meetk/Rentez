import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


const Dashboard = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0;

    const {loading : authLoading} = useSelector((state) => state.auth);
    const {loading : profileLoading} = useSelector((state) => state.profile);

    if( authLoading || profileLoading ){
        return (
            <div>
                <span className='loader'></span>
            </div>
        )
    }
  return (
    <div className='dashboard-wrapper'>
      <Navbar />
      <div className='dashboard'>
        <Sidebar/>
        <Outlet/>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
