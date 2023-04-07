import React, {useState,useContext} from 'react'
import './Login.css'
import LoginLogo from '../Pictures/LoginLogo.png'
import { Link,useNavigate } from 'react-router-dom'
import { auth } from '../firebase.js'
import { LoadingContext } from '../App.js'

export const Login = () => {
  
  const navigate=useNavigate();
  const {setLoading}=useContext(LoadingContext);

  const [user,setUser]=useState({
    email:'',
    password:''
  });

  const signIn=(e)=>{
    e.preventDefault();
    setLoading(true);
    auth.signInWithEmailAndPassword(user.email,user.password)
    .then((auth)=>{
      setLoading(false);
      if(auth){
        navigate('/');
      }
    })
    .catch(error=>{
      setLoading(false);
      alert(error.message);
    });
  }

  return (
    <div className="login">
        <Link to='/'>
            <img src={LoginLogo} alt="" className="login_logo" />
        </Link>
        <div className="login_container">
            <h1>Sign-in</h1>
            <form action="">
                <h5>E-mail</h5>
                <input type="email" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} />
                <h5>Password</h5>
                <input type="password" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} />
                <button className='login_signin' onClick={signIn}>Sign In</button>
            </form>
            <p className="login_message">
              By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
            </p>
            <Link to='/register'>
              <button type='submit' className='login_signup'>Create your Amazon account</button>
            </Link>
        </div>
    </div>
  )
}
