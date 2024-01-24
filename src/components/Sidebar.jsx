import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../data/dashboard-links'
import { logout } from '../services/operations/authAPI'
import ConfirmationModal from './ConfirmationModal'


const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
      )
      const { loading: authLoading } = useSelector((state) => state.auth)
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const location = useLocation()
      // to keep track of confirmation modal
      const [confirmationModal, setConfirmationModal] = useState(null)
    
      if (profileLoading || authLoading) {
        return (
          <div>
            <span className='loader'></span>
          </div>
        )
      }
      const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
      }

  return (
    <>
    <div className='sidebar-wrapper'>
      {
        sidebarLinks?.map((link) => {
            if(link.type && link.type !== user?.accountType) return null;
            return (
                <Link className={`${
                    matchRoute(link.path)
                      ? "sidebar-active-button"
                      : "sidebar-inactive-button"
                  }`} key={link.id} to={`${link.path}`}>{link.name}</Link>
            )
        })
      }
      <button   className="sidebar-inactive-button"
                onClick={() => setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
            }    
        )}
      >Logout
      </button>
    </div>
    {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
    }
    </>
  )
}

export default Sidebar
