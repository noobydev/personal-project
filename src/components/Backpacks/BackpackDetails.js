import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getBackpack } from "../../ducks/reducer";
import Navbar from "../Navbar/Navbar";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from 'react-slick';


class BackpackDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backpack: {},
      toggle: false
    };
  }

  componentWillMount() {
    console.log(this.props.match.params);
    
    axios.get(`/api/backpack/${this.props.match.params.id}`).then( response => {
      console.log(response)
      this.setState({
        backpack: response.data[0]
      })
    }).catch(console.log);
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
    return (
      <div className = 'SimpleSlider backpack-details'>
        <Navbar/>
        <div>{this.state.backpack.product_name}</div>
        <Slider {...settings}>
          <a>
            <img className = 'imrg backpack' src ={this.state.backpack.img_2} alt=""/>
          </a>
        </Slider>
        <div className="description">{this.state.backpack.description}</div>
        {/*
        <a>
        <img src = {this.state.tent.img} /> 
        </a> */}
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
    function mapStateToProps( state ) { 
     return state;
    };

  export default connect(mapStateToProps, { getBackpack })(BackpackDetails)
