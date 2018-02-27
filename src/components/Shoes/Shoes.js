import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
// import './Home.css';

export default class Shoes extends Component {
    render() {
        return (
            <div className='App'>  
                <Navbar />
                {/* <img src={} alt=""/> */}
                <a><button>shoes page</button></a>
            </div> 
        )
    }
}