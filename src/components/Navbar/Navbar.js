import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

 function Navbar() {

 return (
            <div className='Apps'>
                <div className = 'headerstuff'>

                <Link to={'/'}>
                <button className = 'btns'>Home</button></Link>
                <Link  to={`/tents`}>
                <button className='btns'>Tents</button>
                </Link>
                <Link to={'/sleepybags'}>
                <button className='btns'>Sleeping Bags</button>
                </Link>
                <Link to={'/backpacks'}>
                <button className='btns'>Backpacks</button>
                </Link>
                <Link to={'/shoes'}>
                <button className='btns'>Shoes</button>
                </Link>
                <Link to={'/cart'}>
                <button className='btns'>Cart</button>
                </Link>

                </div>
            </div> 
        )
    
}

export default Navbar;