import React, { Component } from 'react';
// import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div className='App'>  
                {/* <img src={} alt=""/> */}
                <a href='http://localhost:3030/auth'><button>Login</button></a>
            </div> 
        )
    }
}