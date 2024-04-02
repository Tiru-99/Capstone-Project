import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false); // State for loader

    const logoutHandler = async () => {
        setLoading(true); // Start loading

        try {
            await authService.logout();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutHandler}
            disabled={loading} // Disable button while loading
        >
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
}

export default LogoutBtn;

