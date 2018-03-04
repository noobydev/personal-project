import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { deleteItems, getCart } from "../../ducks/reducer";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Cart.css";
// const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      quantity: {}
    };
  }

  onToken = token => {
    console.log("token", token);
    token.card = void 0;
    const amount = 999;
    axios.post("/api/payment", { token, amount }).then(response => {
      console.log("payment response", response);
    });
  };

  componentDidMount() {
    axios
      .get("/auth/me")
      .then(res => console.log("this is response", res.data))
      .catch(() => (window.location = process.env.REACT_APP_LOGIN));
    this.props.getCart();
  }

  handleQuantity(qty, id) {
    let qtyCopy = Object.assign({}, this.state.quantity);
    qtyCopy[id] = qty;

    this.setState({
      quantity: qtyCopy
    });
  }

  handleQuantityClick(id, secondId) {
    secondId = String(secondId);
    // console.log(secondId);
    // console.log("this is the props ", this.props.cart[id]);
    // console.log(this.state.quantity[secondId]);
    this.props.cart[id].quantity = this.state.quantity[secondId];
    this.setState({
      quantity: this.state.quantity
    });
    axios
      .put("/api/update", { quantity: this.state.quantity })
      .then(res => console.log(res));
  }

  render() {
    // console.log(this.props);
    let total = 0;
    const displayItems = this.props.cart.length
      ? this.props.cart.map((c, i) => {
          console.log("this is c", c);
          total += +c.price * c.quantity;

          return (
            <div key={i}>
              {c.product_name}
              <img src={c.img} alt="" />
              {/* {c.cart_item_id} */}
              <button onClick={() => this.props.deleteItems(c.cart_item_id)}>
                delete
              </button>
              <button
                className="update"
                onClick={() => this.handleQuantityClick(i, c.cart_item_id)}
              >
                Update
              </button>
              <input
                className="input"
                size="25"
                type="number"
                placeholder={c.quantity}
                onChange={e =>
                  this.handleQuantity(e.target.value, c.cart_item_id)
                }
              />
              $ {c.price} ea.
            </div>
          );
        })
      : null;
    return (
      <div className="cart">
        <Navbar />
        {displayItems}
        <header>
          {" "}
          <h2>Total Price: $ {total.toFixed(2)}</h2>
          <StripeCheckout
            token={this.onToken}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            amount={this.props.amount}
          />
          <a href={process.env.REACT_APP_LOGOUT}><button>Log out</button></a>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps, { deleteItems, getCart })(Cart);
