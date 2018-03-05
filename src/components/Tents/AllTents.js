import React, { Component } from "react";
import { connect } from "react-redux";
import "./Tent.css";
import { getTent } from "../../ducks/reducer";
import { Link } from "react-router-dom";
import Navbar from '../Navbar/Navbar'

class Tent extends Component {

  componentDidMount() {
    this.props.getTent();
  }

  render() {
    let tentsToDisplay = this.props.tent.map((tent, index) => {
      return (
        <div key={index} className="tentorder">
          <div className = 'minititle'>{tent.product_name}</div>
          <Link to={`/tent/${tent.id}`}>
            <button className = 'littlepic'>
              <img src={tent.img}  alt="" />
            </button>
          </Link>
          <div className = 'minititle'>$ {tent.price}</div>
          {/* <div>{tent.rating}</div> */}
        </div>
      );
    });
    return (
      <div className="AllTents">
        <Navbar />
        <style>
          @import url('https://fonts.googleapis.com/css?family=Raleway');
        </style>
        {/* <img src={} alt=""/> */}
        {/* <a>
          <button>tents page</button>
        </a> */}
        {tentsToDisplay}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { getTent })(Tent);
