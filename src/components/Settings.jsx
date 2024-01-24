import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteProfile } from '../services/operations/SettingApi';
import ConfirmationModal from './ConfirmationModal'

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {token} = useSelector((state) =>state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null)

  return (
    <>
    <div className='settings-wrapper'>
      <div className='settings-option'>
        <div className='settings-option-left'>
          <h3>Edit Your Profile</h3>
          <p>Edit your profile to get the best out of your account by managing the information displayed on your profile.</p>
        </div>
        <button onClick={() => navigate('/dashboard/edit')} className='profile-edit-button'>Edit</button>
      </div>
      <div className='settings-option'>
        <div className='settings-option-left'>
          <h3>Change password</h3>
          <p>Change your account password from here. Make sure to setup a strong password.</p>
        </div>
        <button onClick={() => navigate('/dashboard/change-password')} className='profile-edit-button'>Change</button>
      </div>
      <div className='settings-option'>
        <div className='settings-option-left'>
          <h3>Delete Account</h3>
          <p>You will loss access to all content. This cannot be undone.</p>
        </div>
        <button onClick={() => setConfirmationModal({
                text1: "Are you sure?",
                text2: "After this you cannot access your account.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(deleteProfile(token,navigate)),
                btn2Handler: () => setConfirmationModal(null),
            }    
        )} className='delete-profile-button'>Delete</button>
      </div>
    </div>
    {
        confirmationModal && <ConfirmationModal modalData={confirmationModal} />
    }
    </>
  )
}

export default Settings
