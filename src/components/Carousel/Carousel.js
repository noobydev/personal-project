import React, { Component } from 'react';
import './App.css';
// import fall1 from './imgs/fall1.jpg';
// import fall2 from './imgs/fall2.jpg';
// import fall3 from './imgs/fall3.jpg';
// import fall4 from './imgs/fall4.jpg';
// import fall5 from './imgs/fall5.jpg';
// import fall6 from './imgs/fall6.jpg';
// import fall7 from './imgs/fall7.jpg';
// import fall8 from './imgs/fall8.jpg';
// import fall9 from './imgs/fall9.jpg';

let auto; // variable for storing setInterval ID
const timer = 3000; // timer for interval

class App extends Component {

  constructor() {
    super()
    this.state = { 
    //   fallImages: [fall1, fall2, fall3, fall4, fall5, fall6, fall7, fall8, fall9],
      fallImages: [],
      counter: 1,
      direction: 'forward'
    }
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
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

  componentDidMount() {
    auto = setInterval(_ => { this.goForward() }, timer) // store interval ID in variable
  }

  resetInterval() {
    clearInterval(auto); // clear current interval
    auto = setInterval(_ => { this.goForward() }, timer); // set new interval
  }

  componentWillUnmount() {
    clearInterval(auto); // clear interval if exiting component
  }

  goBack() {
    let { counter, fallImages, direction } = this.state;
    if (counter === 0) counter = fallImages.length - 1;
    else counter--;
    this.setState({counter, direction: 'back'})
  }

  goForward() {
    let { counter, fallImages, direction } = this.state;
    if (counter >= fallImages.length - 1) counter = 0;
    else counter++;
    this.setState({counter, direction: 'forward'})
  }

  imgStyle(img, index) { 
    const { counter, fallImages, direction } = this.state;
    const backgroundImage = `url(${img})`;

    // as counter changes, photos with index less than counter are positioned left
    // photos with index greater than counter are positioned right
    const left = (
      index === counter -1 || counter === 0 && index === fallImages.length -1 ? '-700px'
      : index === counter ? '0px'
      : '700px'
    )
    // z-index is set lower for when images need to cross over against the flow
    const zIndex = (
      left === '700px' && direction === 'forward' ? 1 
      : left === '-700px' && direction === 'back' ? 1
      : 2
    )
    return {backgroundImage, left, zIndex};
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Carousel</h1>
          <div>Index of current photo: {this.state.counter}</div>
        </header>

        <div className="App-body">

          <div 
            className="button" 
            onClick={_ => {this.goBack(); this.resetInterval(); /*click resets interval*/}}
            >Back</div>
          
          <div className="img-container">
            {this.state.fallImages.map((img, i) => {
              return <div className="image" key={i} style={this.imgStyle(img, i)}></div>
            })}
          </div>

          <div 
            className="button" 
            onClick={_ => {this.goForward(); this.resetInterval(); /*click resets interval*/}}
            >Forward</div>

        </div>
      </div>
    );
  }
}

export default App;