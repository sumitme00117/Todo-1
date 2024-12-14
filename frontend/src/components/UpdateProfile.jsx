import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profileUpdate } from '../redux/actions/user';
import { Avatar } from '@mui/material';
import Loader from './Loader';

const UpdateProfile = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("")
  
    const { error, message, loading } = useSelector((state) => state.user);
  
    const navigate = useNavigate();
  
    const dispatch = useDispatch();
  
    const handleImageChange = (e) => {
      const file = e.target.files[0]
  
      const Reader = new FileReader()
      Reader.readAsDataURL(file)
  
      Reader.onload = () => {
        if(Reader.readyState === 2){
          setAvatar(Reader.result)
        }
      }
    }
  
    const updateProfileHandler = (e) => {
      e.preventDefault();
      dispatch(profileUpdate(name, email, password, avatar));
      navigate("/")
    };
  
    return (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* You can also show the avatar by using Avatar component of MUI */}
              <Avatar
                src={avatar}
                alt="User"
                sx={{ height: '10vmax', width: '10vmax' }}
              />
              <label>Avatar</label>
              <input type="file" onChange={handleImageChange} />
              <button disabled={loading} onClick={updateProfileHandler}>
                Update Profile
              </button>
            </div>
          )}
        </>
      );
  };

export default UpdateProfile
