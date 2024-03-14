import React from 'react';
import {useState,useEffect} from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth.js';
import {login,logout} from './store/authSlice.js';




function App() {
 
  const[loading, setLoading] = useState(null);
  const dispatch = useDispatch();


  useEffect(()=>{
    authService.getCurrenUser()
    .then((userData)=>{
       if(userData){
          dispatch(login({userData}));
       }

       else{
        dispatch(logout());
       }
    })
    .finally(() => setLoading(false));
  }, [] )

  
  return !loading ? (
    <div className=''> </div>
  ) : null 
}

export default App
