import React from 'react';
// import './Home.css';



import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
  
  export default class Example extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="faded" light expand="md">
            <NavbarBrand href="/">Home Page</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/components/">Components</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu >
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }





// export default class Backpack extends Component {
//     render() {
//         return (
//             <div className='App'>  
//                 {/* <img src={} alt=""/> */}
//                 <a><button>backpacks page</button></a>
//             </div> 
//         )
//     }
// }







// import React from 'react';
// import {connect} from 'react-redux';
// import NotificationSystem from 'react-notification-system';

// class NotificationContainer extends React.Component {

//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.notificationSystem = this.refs.notificationSystem;
//   }

//   componentWillReceiveProps(newProps) {
//     const {message, level} = newProps.notification;
//     this.notificationSystem.addNotification({
//       message,
//       level
//     });
//   }

//   render() {
//     return (
//       <NotificationSystem ref="notificationSystem" />
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     notification: state.notification
//   };
// }

// export default connect(
//   mapStateToProps
// )(NotificationContainer);
