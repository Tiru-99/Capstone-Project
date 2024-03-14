import React from 'react';
import { UseDispatch } from 'react-redux';
import authServices from '../../appwrite/config';
import { logout } from '../../store/authSlice';

function Logoutbtn(){

    //Code for handling the logout function 

    const dispatch = useDispatch(); 
    const logoutHandler =()=>{
        authServices.logout().then(()=>{
            dispatch(logout);
        })
        .catch((error) => {
            console.log("Error while logging out :" , error);
        })
    }
    return(
        <>
            <button>Logout Button</button>
        </>
    )
}

export default Logoutbtn; 