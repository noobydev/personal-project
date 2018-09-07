import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import { getBackpack } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
// import './Home.css';
import './Backpack.css'

class Backpack extends Component {

    componentDidMount() {
        this.props.getBackpack();
    }

    render() {
        // console.log(this.props.backpack)
        let backpacksToDisplay = this.props.backpack.map( (bp, i) => {
            return (<div>

                    <Link to ={`/backpack/${bp.id}`}>
                <div key = {i} className = 'backorder'>
                    <div className = 'minititle'>{bp.product_name}</div>
                    <button className =  'littlepic'>
                        <img src={bp.img} alt=""/>
                    </button>
                    <div className = 'minititle'>$ {bp.price}</div>
                </div>
                    </Link>
            </div>
            )
        })
        return (
            <div className=''>  
                <Navbar />
                <style>
                    @import url('https://fonts.googleapis.com/css?family=Raleway');
                </style>
                {backpacksToDisplay}
            </div> 
        )
    }
    
}
        function mapStateToProps( state ) {
            return state;
        }

export default connect( mapStateToProps, {getBackpack} )(Backpack)


