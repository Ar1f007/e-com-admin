import React from 'react';
import './topbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);
  const dispatch = useDispatch();
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/">
            <span className="logo">e-com-admin</span>
          </Link>
        </div>
        <div className="topRight">
          {admin && <button onClick={() => dispatch(logout())}>Logout</button>}
        </div>
      </div>
    </div>
  );
}
