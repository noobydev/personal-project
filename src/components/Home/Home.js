import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Home.css'

// import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className='App'>
                <body>
                    
                </body> 
                {/* <img src={} alt=""/> */}
                <Link  to={`/tents`}>
                <a href='http://localhost:3030/auth'><button className='btns'>Tents</button></a>
                </Link>
                <Link to={'/sleepybags'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Sleeping Bags</button></a>
                </Link>
                <Link to={'/backpacks'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Backpacks</button></a>
                </Link>
                <Link to={'/shoes'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Shoes</button></a>
                </Link>
                <Link to={'/cart'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Cart</button></a>
                </Link>



                {/* <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">Navbar</a>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
  </div>
</nav> */}
            </div> 
        )
    }
}