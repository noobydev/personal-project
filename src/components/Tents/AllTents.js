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
        <div key={index} className="product-container">
          <Link to={`/tent/${tent.id}`}>
            <button>
              <img src={tent.img} alt="" />
            </button>
          </Link>
          <div>{tent.product_name}</div>
          <div>$ {tent.price}</div>
          <div>{tent.rating}</div>
        </div>
      );
    });
    return (
      <div className="AllTents">
        <Navbar />
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
