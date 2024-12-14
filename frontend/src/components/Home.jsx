import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/actions/user'
import Loader from './Loader'

const Home = () => {
    const navigate = useNavigate()

    const {error, message, isAuthenticated, user, loading} = useSelector(state => state.user)

    const dispatch = useDispatch()

    const logoutHandler = () => {
      dispatch(logout())
      navigate("/")
    }

   
    return (
      loading ? (
        <Loader />
      ) : (
        <>
          <div>
            This is Home Page
          </div>
          {isAuthenticated ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
          <div>
            {isAuthenticated ? (
              <>
              <button onClick={() => navigate("/task")}>View Tasks</button>
              <button onClick={() => navigate("/profile")}>My Profile</button>
              </>
            ) : (
              <button onClick={() => navigate("/signup")}>Signup</button>
            )}
          </div>
        </>
      )
    );
}

export default Home
