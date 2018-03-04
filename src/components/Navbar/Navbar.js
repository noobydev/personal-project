import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

 function Navbar() {

 return (
                <div className='Apps'>
                <div className = 'headerstuff'>
                <div className = 'topnav'>
                <a>
                <Link to={'/'}>
                <button className = 'btns'>Home</button></Link>
                </a>
                <a>
                <Link  to={`/tents`}>
                <button className='btns'>Tents</button>
                </Link>
                </a>
                <a>
                <Link to={'/sleepybags'}>
                <button className='btns'>Sleeping Bags</button>
                </Link>
                </a>
                <a>
                <Link to={'/backpacks'}>
                <button className='btns'>Backpacks</button>
                </Link>
                </a>
                <a>
                <Link to={'/shoes'}>
                <button className='btns'>Shoes</button>
                </Link>
                </a>
                <a>
                <Link to={'/cart'}>
                <button className='btns'>Cart</button>
                </Link>
                </a>

                </div>

                {/* <div class="topnav">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div> */}

                </div>
            </div> 
        )
    
}

export default Navbar;