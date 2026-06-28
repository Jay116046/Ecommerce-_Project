import './App.css'
import AllRoutes from './All_Routes'
import { useEffect } from "react"
import { authCheck } from "./store/authSlice"
import { useDispatch } from 'react-redux';

function App() {
    const disPatch = useDispatch();


    useEffect(()=>{
        const token = JSON.stringify(sessionStorage.getItem('token'));
        disPatch(authCheck(token));
        
    },[disPatch])

  return (
    <>
      <AllRoutes />
    </>
  )
}

export default App
