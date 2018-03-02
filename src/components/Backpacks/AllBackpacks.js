import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { getBackpack } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
// import './Home.css';

class Backpack extends Component {

    componentDidMount() {
        this.props.getBackpack();
    }

    render() {
        // console.log(this.props.backpack)
        let backpacksToDisplay = this.props.backpack.map( (bp, i) => {
            return (
                <div key = {i} className = ''>
                    <Link to ={`/backpack/${bp.id}`}>
                    <button>
                        <img src={bp.img} alt=""/>
                    </button>
                    </Link>
                    <div>{bp.product_name}</div>
                </div>
            )
        })
        return (
            <div className=''>  
                <Navbar />
                {backpacksToDisplay}
            </div> 
        )
    }
    
}
        function mapStateToProps( state ) {
            return state;
        }

export default connect( mapStateToProps, {getBackpack} )(Backpack)


