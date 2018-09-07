import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { getBackpack } from "../../ducks/reducer";
import Navbar from "../Navbar/Navbar";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';


class BackpackDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backpack: {},
      toggle: false
    };
  }


  notify = () => toast('Item Added!')
  

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
      itemId: this.props.match.params.id
    });
    this.setState({
      toggle: !this.state.toggle
    })
    console.log(this.props.match.params);    
  }


  render() {
    // var ToastContainer = {
    //   position: top-left
    // }
    var settings = { 
      // dots: true, 
      infinite: true, 
      speed: 500, 
      slidesToShow: 1, 
      slidesToScroll: 1, 
      fade: true, 
      pauseOnHover:false,
      // position: top-left
    };
    return (
      <div className = 'SimpleSlider pack-details'>
        <Navbar/>
        <ToastContainer position = 'bottom-right' />
        {/* <div className = 'cartbtn'>
             <a>
             <button className="backpackorder" onClick={() => {
                 this.addToCart(); this.notify();
               }}> 
               ADD ME TO CART!
             </button>
           </a>
        </div> */}
        <div className = 'packtitle'>{this.state.backpack.product_name}</div>
        <Slider {...settings}>
          <a>
            <img className = 'imrg backpack' src ={this.state.backpack.img_2} alt=""/>
          </a>
          <a>
            <img className="imrg backpack" src={this.state.backpack.img_3} alt="" />
          </a>
          <a>
            <img className="imrg backpack" src={this.state.backpack.img_4} alt="" />
          </a>
        </Slider>
        <div className="backdescription">{this.state.backpack.description}</div>

        {this.state.toggle ? (
    <a href={process.env.REACT_APP_LOGIN}>
      <button> Login </button>
    </a>
  ) : null}
  <div className="cart">
    <a>
      <button
        className="backpackorder"
        onClick={() => {
          this.addToCart(); this.notify();
        }}
      >
        {" "}
        add to cart
      </button>
    </a>
  </div>

        <style>
          @import url('https://fonts.googleapis.com/css?family=Raleway');
        </style>
       
       
      </div>
    )
  }
}
    function mapStateToProps( state ) { 
     return state;
    };

  export default connect(mapStateToProps, { getBackpack })(BackpackDetails)




// was right under backpack description


  // {this.state.toggle ? (
  //   <a href={process.env.REACT_APP_LOGIN}>
  //     <button> Login </button>
  //   </a>
  // ) : null}
  // <div className="cart">
  //   <a>
  //     <button
  //       className="backpackorder"
  //       onClick={() => {
  //         this.addToCart(); this.notify();
  //       }}
  //     >
  //       {" "}
  //       add to cart
  //     </button>
  //   </a>
  // </div>

