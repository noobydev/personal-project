import React, { Component } from "react";
import { connect } from "react-redux";
import { getSleepingBag } from "../../ducks/reducer";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

class SleepyBagDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sleeping_bag: {},
      toggle: false
    };
  }

  componentWillMount() {
    axios
      .get(`/api/sleepybag/${this.props.match.params.id}`)
      .then(response => {
        console.log(this.state.sleeping_bag);

        this.setState({ sleeping_bag: response.data[0] });
      })
      .catch(console.log);
  }

  addToCart() {
    axios.post("/api/layaway", { itemId: this.props.match.params.id });
    this.setState({ toggle: !this.state.toggle });
    console.log("asdf");
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
      <div className="SimpleSlider sleepy-details">
        <Navbar />
        <div>{this.state.sleeping_bag.product_name}</div>
        <Slider {...settings}>
          <a>
            <img src={this.state.sleeping_bag.img_4} alt="" />
          </a>
          <a>
            <img src={this.state.sleeping_bag.img_3} alt="" />
          </a>
          <a>
            <img src={this.state.sleeping_bag.img_2} alt="" />
          </a>
        </Slider>
        {this.state.toggle ? (
          <a href={process.env.REACT_APP_LOGIN}>
            <button>Please Login</button>
          </a>
        ) : null}
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
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getSleepingBag })(SleepyBagDetails);
