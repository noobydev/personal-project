import React, { Component } from "react";
import { connect } from "react-redux";
import { getSleepingBag } from "../../ducks/reducer";
import axios from "axios";
import Navbar from '../Navbar/Navbar'
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
      console.log(this.props.params.match)
      .then(response => {
        console.log(response);
        console.log('hits');
        this.setState({ sleeping_bag: response.data[0] });
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
          <img src={this.state.sleeping_bag.img_4} alt="" />
        </a>
        <a>
          <img src={this.state.sleeping_bag.img_3} alt="" />
        </a>
        <a>
          <img src={this.state.sleeping_bag.img_2} alt="" />
        </a>
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

export default connect(mapStateToProps, { getSleepingBag })(SleepyBagDetails);
