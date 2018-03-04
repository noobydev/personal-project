import React, { Component } from "react";
import "./App.css";
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Backpack from "./components/Backpacks/AllBackpacks";
import BackpackDetails from "./components/Backpacks/BackpackDetails";
import Shoes from "./components/Shoes/Shoes";
import ShoeDetails from "./components/Shoes/ShoeDetails";
import SleepyBag from "./components/SleepyBags/SleepyBags";
import SleepyBagDetails from "./components/SleepyBags/SleepyBagDetails";
import Tent from "./components/Tents/AllTents";
import TentDetails from "./components/Tents/TentDetails";
import Cart from "./components/Cart/Cart"; 

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/tents" component={Tent} />
            <Route path="/tent/:id" component={TentDetails} />
            <Route path="/sleepybags" component={SleepyBag} />
            <Route path="/sleepybag/:id" component={SleepyBagDetails} />
            <Route path="/backpacks" component={Backpack} />
            <Route path="/backpack/:id" component={BackpackDetails} />
            <Route path="/shoes" component={Shoes} />
            <Route path="/shoe/:id" component={ShoeDetails} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
