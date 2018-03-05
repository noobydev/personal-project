import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSleepingBag } from '../../ducks/reducer';
import Navbar from '../Navbar/Navbar'
import './SleepyBag.css'
// import './Home.css';

class SleepyBag extends Component {

    componentDidMount() {
        this.props.getSleepingBag();
        console.log(this.props.sleeping_bag)
    }

    render() {
        // console.log(this.props)
        let sleepybagToDisplay = this.props.sleeping_bag.map((sleeping_bag, index) => {
            return (
                <div key = {index} className = 'sleepyorder'>
                    <div className = 'minititle'>{sleeping_bag.product_name}</div>
                    <Link to = {`/sleepybag/${sleeping_bag.id}`}>
                    <button className = 'littlepic'>
                        <img src={sleeping_bag.img} alt=""/>
                    </button>
                    </Link>
                    <div className = 'minititle'>$ {sleeping_bag.price}</div>
                </div>
            )
        })
        return (
            <div className = 'AllSleepy'>  
            <Navbar /> 
            <style>
          @import url('https://fonts.googleapis.com/css?family=Raleway');
        </style>               
                {sleepybagToDisplay}
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getSleepingBag })(SleepyBag)
