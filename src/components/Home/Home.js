import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
// import camping1 from "../../images/camping1.jpg";
import camping2 from "../../images/camping2.jpg";
// import camping3 from "../../images/camping3.jpg";
import camping4 from '../../images/camping4.jpg';
import camping5 from '../../images/camping5.jpg';
import campbackground from '../../images/campbackground.jpg';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Home.css";
// import reducer from "../../ducks/reducer";

export default class Home extends Component {
  render() {
    var settings = {
      // dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2300,
      fade: true,
      // pauseOnHover: false,
      // centerMode: true,
      nextArrow: null
    };

  //   let backImg = campbackground
  //   let styles = {
  //     root: {
  //        backgroundImage: campbackground,
  //        backgroundRepeat  : 'no-repeat',
  //        backgroundPosition: 'center'
  //   }
  // }


    let images = [camping4, camping2, camping5];

    return (
      <div className="SimpleSlider">
        <Navbar />
        {/* <div className="HomeSlider"> */}
          <Slider {...settings}>
            {images.map((img, i) => (
              <div key = {i} className="imrg" style={{ backgroundImage: `url(${img})` }}>
                <h2 className = 'h2text'>WELCOME TO HAPPY CAMPER</h2>
              </div>
            ))} 
          </Slider>
        {/* </div> */}

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


