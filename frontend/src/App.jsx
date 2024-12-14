import './App.css'
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'
import Task from './components/Task'
import {useDispatch} from 'react-redux'
import { loadUser } from './redux/actions/user'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { clearError, clearMessage } from './redux/reducers/userReducer'
import ToastHandler from './components/ToastHandler'
import Signup from './components/Signup'
import UpdateTask from './components/UpdateTask'
import UpdateProfile from './components/UpdateProfile'
function App() {

  const dispatch = useDispatch()

  const {error, message, isAuthenticated, user} = useSelector(state => state.user)


  useEffect(()=>{

    dispatch(loadUser())

  },[dispatch])

  



  return (
    <>
    
    <Router>
      <ToastHandler/>
      <Routes>
      
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={isAuthenticated ? <Profile/> : <Login/>}/>
        <Route path="/task" element={isAuthenticated ? <Task/> : <Login/>}/>
        <Route path="/updateprofile" element={isAuthenticated ? <UpdateProfile/> : <Login/>}/>

      </Routes>
    </Router>
    </>
  )
}

export default App
