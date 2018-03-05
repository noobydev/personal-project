import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getShoes } from '../../ducks/reducer';
import './Shoes.css';

class Shoes extends Component {

    componentDidMount() {
        this.props.getShoes()
        console.log(this.props.shoes);
        
        
    }
    render() {
        let shoesToDisplay = this.props.shoes.map((shoes, i) => {
            return (
                <div key = {i} className="shoeorder">
                    <div className = 'minititle'>{shoes.product_name}</div>
                    <Link to = {`/shoe/${shoes.id}`}>
                        <button className = 'littlepic'>
                            <img src={shoes.img} alt=""/>
                        </button>
                    </Link>
                    <div className = 'minititle'>$ {shoes.price}</div>
                </div>
            )
        })
        return (
            <div className=''>  
                <Navbar />
                <style>
                     @import url('https://fonts.googleapis.com/css?family=Raleway');
                </style>
                {shoesToDisplay}
            </div> 
        )
    }
}
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getShoes })(Shoes)
