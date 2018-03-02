import React, { Component } from 'react';
import './App.css';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Backpack from './components/Backpacks/AllBackpacks';
// import NotificationContainer from './components/Backpacks/Backpacks';
import Shoes from './components/Shoes/Shoes';
import Tent from './components/Tents/AllTents';
import TentDetails from './components/Tents/TentDetails';
import SleepyBag from './components/SleepyBags/SleepyBags';
import Cart from './components/Cart/Cart';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/tents' component={Tent} />
            <Route path='/tent/:id' component={TentDetails} />
            <Route path='/sleepybags' component={SleepyBag} />
            <Route path='/backpacks' component={Backpack} />
            {/* <Route path='/backpacks' component={ NotificationContainer } /> */}
            <Route path='/shoes' component={Shoes} />
            <Route path='/cart' component={Cart} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
