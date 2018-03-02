import React, { Component } from "react";
import { connect } from "react-redux";
import "./Tent.css";
import { getTent } from "../../ducks/reducer";
import axios from "axios";
import Navbar from '../Navbar/Navbar'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Slider from "react-slick";



class TentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tent: {},
      toggle: false
    };
  }

  componentWillMount() {
    axios
      .get(`/api/tent/${this.props.match.params.id}`)
      .then(response => {
        console.log(response);
        this.setState({ tent: response.data[0] });
      })
      .catch(console.log);
  }

  addToCart() {
    axios.post("/api/layaway", { itemId: this.props.match.params.id });
    this.setState({ toggle: !this.state.toggle });
    console.log('asdf')
  }

  render() {
    var settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      pauseOnHover: false
    };
    return (
      <div className = 'SimpleSlider tent-details'>
        <Navbar />
      <div className = 'title'>

        {this.state.tent.product_name}
      </div>
        <Slider {...settings}>

        <a>
          <img className = 'imrg' src={this.state.tent.img_4} alt="" />
        </a>
        <a>
          <img className = 'imrg' src={this.state.tent.img_3} alt="" />
        </a>
        <a>
          <img className = 'imrg' src={this.state.tent.img_2} alt="" />
        </a>
        </Slider>
        <div className = 'description'>{this.state.tent.description}</div>
        {/* <a>
                <img src={this.state.tent.img} />
                </a> */}
        {this.state.toggle ? (
          <a href={process.env.REACT_APP_LOGIN}>
            <button>Login</button>
          </a>
        ) : null}
        
        <div className = 'cart'>

        <a>
          <button
            className="btn"
            onClick={() => {
              this.addToCart();
            }}
          >
            add to cart
          </button>
        </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getTent })(TentDetails);
