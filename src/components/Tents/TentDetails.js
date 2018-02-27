import React, { Component } from "react";
import { connect } from "react-redux";
import "./Tent.css";
import { getTent } from "../../ducks/reducer";
import axios from "axios";
import Navbar from '../Navbar/Navbar'


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
    return (
      <div>
        <Navbar />
        <a>
          <img src={this.state.tent.img_4} alt="" />
        </a>
        <a>
          <img src={this.state.tent.img_3} alt="" />
        </a>
        <a>
          <img src={this.state.tent.img_2} alt="" />
        </a>
        {/* <a>
                <img src={this.state.tent.img} />
                </a> */}
        {this.state.toggle ? (
          <a href="http://localhost:3030/auth">
            <button>Login</button>
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

export default connect(mapStateToProps, { getTent })(TentDetails);
