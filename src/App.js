import React, { Component } from 'react';
import './App.css';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Home from './components/Home/Home'

class App extends Component {
  render() {
    return (
      <div className="App">
      <HashRouter>
          <Switch>
            <Route exact path='/' component={ Home } />
            {/* <Route path='/private' component={ Private } /> */}
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
