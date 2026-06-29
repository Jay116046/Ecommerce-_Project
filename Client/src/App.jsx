import './App.css'
import AllRoutes from './All_Routes'
import { useEffect } from "react"
import { authCheck } from "./store/authSlice"
import { useDispatch } from 'react-redux';

function App() {
    const disPatch = useDispatch();


    useEffect(()=>{
        const token = JSON.parse(sessionStorage.getItem('token'));
        // console.log(token);
        
        disPatch(authCheck(token));
    },[])

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
