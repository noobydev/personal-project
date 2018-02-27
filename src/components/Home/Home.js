import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Slider from "react-slick";
import camping1 from "../../images/camping1.jpg";
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
// import './Home.css';

export default class Home extends Component {
  render() {
    var settings = {
      dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 1,
    //   slidesToScroll: 1
    };
    return (
      <div className="Apper">
        <Navbar />

      {/* <Slider {...settings}>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
        </Slider> */}

        
        
        <img src="camping1.jpg" alt="" />

        <Slider {...settings}>
          <div>
            <img src={camping1} alt="" />
          </div>
          <div>
            <img
              src="http://jaguarccc.co.uk/wp-content/uploads/2016/12/about.jpg"
              alt=""
            />
          </div>
            <div><h3>4</h3></div>
            <div><h3>5</h3></div>
            <div><h3>6</h3></div>
        </Slider>
        {/* <img src={} alt=""/>
                
                {/* <Link  to={`/tents`}>
                <a><button className='btns'>Tents</button></a>
                </Link>
                <Link to={'/sleepybags'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Sleeping Bags</button></a>
                </Link>
                <Link to={'/backpacks'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Backpacks</button></a>
                </Link>
                <Link to={'/shoes'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Shoes</button></a>
                </Link>
                <Link to={'/cart'}>
                <a href='http://localhost:3030/auth'><button className='btns'>Cart</button></a>
                </Link> */}
      </div>
    );
  }
}
