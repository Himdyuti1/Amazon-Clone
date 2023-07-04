import './App.css';
import { Header } from './MyComponents/Header';
import { Home } from './MyComponents/Home';
import { Checkout } from './MyComponents/Checkout.js'
import { Login } from './MyComponents/Login.js'
import { Register } from './MyComponents/Register';
import { Loading } from './MyComponents/Loading';
import { Payment } from './MyComponents/Payment.js';
import { Orders } from './MyComponents/Orders';
import{
  BrowserRouter as Router,
  Routes,
  Route
}from 'react-router-dom'
import React, { useEffect,useContext, useState, createContext } from 'react';
import { auth, db } from './firebase';
import { StateContext } from './MyContexts/StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise=loadStripe(
  "pk_test_51MsniYSBA700P73m4F50Ffmq3uiLqMdmJhFgW3dwYHc1eAtg4EE2REf6HZnOl4OIjpkrV4V9rO4eCknKv3UhupVD0068W85kip"
);

export const LoadingContext=createContext();

function App() {

  const [{name},dispatch] = useContext(StateContext);
  const [loading,setLoading]=useState(false);
  
  useEffect(() => {
    // setLoading(true);
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        let Name='';
        db.collection('users').doc(authUser.uid).get()
        .then(doc=>{
          Name=doc.data().name;
          let newBasket=doc.data().basket;
          dispatch({
            type:'SET_USER',
            user:authUser,
            name:Name,
            basket:newBasket
          })
          console.log(name);
          setLoading(false);
        })
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null,
          name:'',
          basket:[]
        })
        setLoading(false);
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        {
          loading?<Loading />:
          <LoadingContext.Provider value={{setLoading}}>
            <Routes>
              <Route exact path='/' element={
                <React.Fragment>
                  <Header />
                  <Home />
                </React.Fragment>
              } />
              <Route exact path='/checkout' element={
                <React.Fragment>
                  <Header />
                  <Checkout />
                </React.Fragment>
              } />
              <Route exact path='/login' element={<Login/ >}/>
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/payment' element={
                <React.Fragment>
                  <Header />
                  <Elements stripe={promise}>
                    <Payment />
                  </Elements>
                </React.Fragment>
              } />
              <Route exact path='/orders' element={
                <React.Fragment>
                  <Header />
                  <Orders />
                </React.Fragment>
              } />
            </Routes>
          </LoadingContext.Provider>
        }
      </div>
    </Router>
  );
}

export default App;



//Header
//Home