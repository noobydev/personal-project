import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { deleteItems, getCart } from "../../ducks/reducer";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
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
    this.props.getCart();
  }

  handleQuantity(qty, id) {
    let qtyCopy = Object.assign({}, this.state.quantity);
    qtyCopy[id] = qty;
    this.setState(
      {
        quantity: qtyCopy
      },
      () => {
        console.log(this.state.quantity);
      }
    );
  }

  handleQuantityClick(id) {
    axios
      .put("/api/update", { quantity: this.state.quantity })
      .then(res => console.log(res));
  }

  // deleteItem() {
  //     axios.delete('/api/cart/:id',)
  // }

  render() {
    console.log(this.props);
    let total = 0;
    const displayItems = this.props.cart.length
      ? this.props.cart.map((c, i) => {
          console.log(c);
          total += +c.price;
          return (
            <div key={i}>
              {c.product_name}

              <img src={c.img} alt="" />
              {/* {c.cart_item_id} */}
              <button onClick={() => this.props.deleteItems(c.cart_item_id)}>
                delete
              </button>
              <button onClick={() => this.handleQuantityClick()}>Update</button>
              <input
                className="input"
                type="number"
                placeholder={c.quantity}
                onChange={e =>
                  this.handleQuantity(e.target.value, c.cart_item_id)
                }
              />
              {c.price}
            </div>
          );
        })
      : null;
    return (
      <div className="App">
        <Navbar />
        {displayItems}
        <header>
          {" "}
          <StripeCheckout
            token={this.onToken}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
            amount={this.props.amount}
          />
        </header>
        <h2>Total Price:{total.toFixed(2)}</h2>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onCartRemove: (cart) => {
//       dispatch(deleteItems(id))
//     }
//   }
// }

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(mapStateToProps, { deleteItems, getCart })(Cart);
