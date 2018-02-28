import React, { Component } from 'react';
import { Link, Switch } from 'react-router-dom';
import './Navbar.css';

 function Navbar() {

 return (
            <div className='Apps'>
                <div className = 'headerstuff'>

                <Link to={'/'}>
                <button className = 'btns'>Home</button></Link>
                <Link  to={`/tents`}>
                <a><button className='btns'>Tents</button></a>
                </Link>
                <Link to={'/sleepybags'}>
                <a><button className='btns'>Sleeping Bags</button></a>
                </Link>
                <Link to={'/backpacks'}>
                <a><button className='btns'>Backpacks</button></a>
                </Link>
                <Link to={'/shoes'}>
                <a><button className='btns'>Shoes</button></a>
                </Link>
                <Link to={'/cart'}>
                <a><button className='btns'>Cart</button></a>
                </Link>

                </div>
            </div> 
        )
    
}

export default Navbar;