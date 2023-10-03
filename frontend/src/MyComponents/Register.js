import React, { useState,useContext } from 'react'
import './Register.css'
import RegisterLogo from '../Pictures/LoginLogo.png'
import { Link,useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { LoadingContext } from '../App'

export const Register = () => {

    const navigate=useNavigate();
    const {setLoading}=useContext(LoadingContext);

    const[newUser,setNewUser]=useState({
        name:'',
        email:'',
        mobileNumber:'',
        password:
    });

    const signUp=(e)=>{
        setLoading(true);
        auth.createUserWithEmailAndPassword(newUser.email,newUser.password)
        .then((authUser)=>{
            db.collection('users').doc(authUser.user.uid).set({
                name:newUser.name,
                email:newUser.email,
                mobileNumber:newUser.mobileNumber,
                basket:[]
            }).then(()=>{
                auth.signInWithEmailAndPassword(newUser.email,newUser.password)
                .then((auth)=>{
                    setLoading(false);
                    if(auth){
                        navigate('/');
                    }
                })
                .catch(error=>{
                    setLoading(false);
                    alert(error.message)
                });
            }).catch(error=>{
                console.log(error.message);
                setLoading(false);
            })
        })
        .catch(error=>{
            setLoading(false);
          alert(error.message);
        })
    }
    
  return (
    <div className="register">
        <Link to='/'>
            <img src={RegisterLogo} alt="" className="register_logo" />
        </Link>
        <div className="register_container">
            <h1>Create Account</h1>
            <form action="">
                <h5>Your name</h5>
                <input type="text" placeholder='First and last name' value={newUser.name} onChange={(e)=>setNewUser({...newUser,name:e.target.value})} required/>
                <h5>Email ID</h5>
                <input type="email" placeholder='example@company.com' value={newUser.email} onChange={(e)=>setNewUser({...newUser,email:e.target.value})} required/>
                <h5>Mobile Number</h5>
                <input type="number" placeholder="Mobile number" value={newUser.mobileNumber} onChange={(e)=>setNewUser({...newUser,mobileNumber:e.target.value})} required/>
                <h5>Password</h5>
                <input className='registerForm_password' type="password" placeholder='At least 6 characters' value={newUser.password} onChange={(e)=>setNewUser({...newUser,password:e.target.value})} required/>
                <small className="message">Passwords must be at least 6 characters.</small>
            </form>
            <small className='register_consent'>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Amazon. Message and data rates may apply.</small>
            <button type='submit' onClick={signUp}>Continue</button>
            <hr className="register_container_separation" />
            <small className="signIn">
                Already have an account? 
                <Link to='/login'>Sign In</Link>
            </small>

            <small className="policy">By creating an account or logging in, you agree to Amazon's Conditions of Use and Privacy Policy.</small>
        </div>
    </div>
  )
}
