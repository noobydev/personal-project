import React, { Component } from "react";
import { connect } from "react-router-dom";
import axios from "axios";
import { getBackpack } from "../../ducks/reducer";
import Navbar from "../Navbar/Navbar";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

class BackpackDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backpack: {},
      toggle: false
    };
  }

  componentWillMount() {
    axios
      .get(`/api/backpack/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          backpack: response.data[0]
        });
      })
      .catch(console.log);
  }

  addToCart() {
    axios.post("/api/layaway", {
      itedId: this.props.match.params.id
    });
    this.setState({
      toggle: !this.state.toggle
    });
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
      <div>
        <Navbar />
      </div>
    );
  }
}
