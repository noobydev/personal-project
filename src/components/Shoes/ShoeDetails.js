import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './Shoes.css';
import Navbar from '../../components/Navbar/Navbar';
import { getShoes } from '../../ducks/reducer';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from 'react-slick';


class ShoesDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shoes: {},
            toggle: false
        }
    }

    componentWillMount() {
        axios.get(`/api/shoe/${this.props.match.params.id}`).then( response => {
            this.setState({
                shoes: response.data[0]
            })
        }).catch(console.log)
    }

    addToCart() {
        axios.post('/api/layaway', {
          itedId: this.props.match.params.id
        });
        this.setState({
          toggle: !this.state.toggle
        })
      }


    render() {
        var settings = { 
            // dots: true, 
            infinite: true, 
            speed: 500, 
            slidesToShow: 1, 
            slidesToScroll: 1, 
            fade: true, 
            pauseOnHover:false
          };
        return(
            <div className = 'SimpleSlider backpack-details'>
                <Navbar/>
                <div>{this.state.shoes.product_name}</div>
                <Slider{...settings}>
                    <a>
                        <img className = 'imrg shoes' src={this.state.shoes.img_2} alt=""/>
                    </a>
                </Slider>
                <div className = 'description shoes'>{this.state.shoes.description}</div>
                {this.state.toggle ? (
          <a href={process.env.REACT_APP_LOGIN}>
            <button> Login </button>
          </a>
        ) : null}
        <div className="cart">
          <a>
            <button
              className="btn"
              onClick={() => {
                this.addToCart();
              }}
            >
              {" "}
              add to cart
            </button>
          </a>
        </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps, { getShoes })(ShoesDetails)