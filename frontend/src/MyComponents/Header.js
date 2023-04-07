import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import React, { useContext } from 'react';
import './Header.css';
import HeaderLogo from '../Pictures/HeaderLogo.png';
import { Link } from 'react-router-dom';
import { StateContext } from '../MyContexts/StateProvider';
import { auth } from '../firebase';

export const Header = () => {

    const [{basket,user,name},dispatch]=useContext(StateContext);

    const handleAuthentication=()=>{
        if(user){
            auth.signOut();
        }
    }

    let fname='';
    if(user){
        if(name?.length){
            let i=0;
            while(i<name.length && name[i]!==' ') i++;
            fname=name.substring(0,i);
        }
    }

    return (
        <div className="header">
            <Link to='/'>
                <img src={HeaderLogo} alt="" className="header_logo" />
            </Link>
            
            <div className="header_search">
                <input type="text" className="header_searchInput" />
                <SearchIcon className="header_searchIcon" />
            </div>

            <div className="header_nav">
                <Link to={!user && '/login'}>
                    <div className="header_options" onClick={handleAuthentication}>
                        <span className="header_optionLineOne">Hello {fname}</span>
                        <span className="header_optionLineTwo">{user?'Sign Out':'Sign In'}</span>
                    </div>
                </Link>
                <Link to={user?'/orders':'/login'}>
                    <div className="header_options">
                        <span className="header_optionLineOne">Returns</span>
                        <span className="header_optionLineTwo">& Orders</span>
                    </div>
                </Link>
                <div className="header_options">
                    <span className="header_optionLineOne">Your</span>
                    <span className="header_optionLineTwo">Prime</span>
                </div>
                <Link to={user?'/checkout':'/login'}>
                    <div className="header_optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}
