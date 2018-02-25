import React, { Component } from "react";
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export default class Backpack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: []
    };
  }

  

  onToken = token => {
    console.log('token', token);
    token.card = void 0;
    const amount = 999;
    axios.post('/api/payment', {token, amount})
    .then(response => { console.log('payment response', response) });
  }

  componentDidMount() {
    axios
      .get("/api/cart")
      .then(resp => {
        console.log(resp);
        this.setState({ cartItems: resp.data });
      })
      .catch(console.log);
  }

  deleteItem() {
      axios.delete('/api/cart/:id',)
  }

  render() {
    const displayItems = this.state.cartItems.map((c, i) => {
      return (
        <div key={i}>
          {c.product_name}
          <img src={c.img} alt="" />
        </div>
      );
    });
    return (
      <div className="App">
        {displayItems}
        <a>
          <button>cart page</button>
        </a>
        <header> <StripeCheckout
          token={this.onToken}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
          amount={999} />
          </header>
      </div>
    );
  }
}
