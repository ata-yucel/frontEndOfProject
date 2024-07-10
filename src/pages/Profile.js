import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { username, email, balance } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleChangePassword = () => {
    navigate('/changePassword');
  };

  return (
    <div className="flex flex-col items-center h-screen w-screen bg-gradient-to-r from-yellow-600 to-lime-600 p-8 mt-[-17px]">
      <div className="flex flex-col bg-white shadow-lg rounded-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Profile</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">Username:</div>
          <div className="text-xl">{username}</div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">Email:</div>
          <div className="text-xl">{email}</div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold">Balance:</div>
          <div className="text-xl">{balance} TL</div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleChangePassword}
            className="bg-green-500 hover:bg-amber-700 text-rose-50 font-bold py-2 px-4 rounded "
            
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
