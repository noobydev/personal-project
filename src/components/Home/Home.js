import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import camping1 from "../../images/camping1.jpg";
import camping2 from "../../images/camping2.jpg";
import camping3 from "../../images/camping3.jpg";
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import './Home.css';

export default class Home extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      fade: true,
      pauseOnHover: false
    };

    let images = [camping1, camping2, camping3]

    return (
      <div className="SimpleSlider">
          <Navbar />
      <div className  = 'HomeSlider'>

        <Slider {...settings}>
          {images.map(img => (
            <div className="imrg" style={{ backgroundImage: `url(${img})` }}>
              {/* <h2>TEXT</h2> */}
            </div>
          ))}
        </Slider>
      </div>

        {/* <Slider {...settings}>
            <div className = 'imrg'>
                <img src={camping1} style={{ backgroundImage: {camping1} }}/>
                <img src={camping2} style={{ backgroundImage: {camping2} }}/>
            </div>
        </Slider> */}
      </div>
    );
  }
}
