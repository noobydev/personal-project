import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSleepingBag } from '../../ducks/reducer';
// import './Home.css';

class SleepyBag extends Component {
    componentDidMount() {
        this.props.getSleepingBag();
    }
    render() {
        // console.log(this.props)
        let sleepybagToDisplay = this.props.sleeping_bag.map((sleeping_bag, index) => {
            return (
                <div key = {index}>
                    <Link to = {`/sleepybag/${sleeping_bag.id}`}>
                    <button>
                        <img src={sleeping_bag.img} alt=""/>
                    </button>
                    </Link>
                </div>
            )
        })
        return (
            <div className='App'>  
                {/* <img src={} alt=""/> */}
                
                <a><button>sleepy page</button></a>
                <Button bsStyle='success'>sleepy page</Button>
                {sleepybagToDisplay}
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getSleepingBag })(SleepyBag)
