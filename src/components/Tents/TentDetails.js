import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Tent.css'
import { getTent } from '../../ducks/reducer'
import axios from 'axios'
import Popup from 'react-popup';

Popup.registerPlugin('popover', function (content, target) {
    this.create({
        content: content,
        className: 'popover',
        noOverlay: true,
        position: function (box) {
            let bodyRect      = document.body.getBoundingClientRect();
            let btnRect       = target.getBoundingClientRect();
            let btnOffsetTop  = btnRect.top - bodyRect.top;
            let btnOffsetLeft = btnRect.left - bodyRect.left;
            let scroll        = document.documentElement.scrollTop || document.body.scrollTop;

            box.style.top  = (btnOffsetTop - box.offsetHeight - 10) - scroll + 'px';
            box.style.left = (btnOffsetLeft + (target.offsetWidth / 2) - (box.offsetWidth / 2)) + 'px';
            box.style.margin = 0;
            box.style.opacity = 1;
        }
    });
});


Popup.plugins().popover('This popup will be displayed right above this button.', '.btn');


class TentDetails extends Component{
    constructor(props) {
        super(props)
        this.state = {
            tent: { }
        }


    }

    componentWillMount( ) {
        axios.get( `/api/tent/${ this.props.match.params.id }` ).then( response => {
            console.log(response)
            this.setState({ tent: response.data[0] })
        } )
    }

    render( ) {
            return( <div>
                <a>
                <img src={this.state.tent.img_4} />
                </a>
                <a>
                <img src={this.state.tent.img_3} />
                </a>
                <a>
                <img src={this.state.tent.img_2} />
                </a>
                {/* <a>
                <img src={this.state.tent.img} />
                </a> */}
                
                    
            <Popup />
            <a><button className='btn' onClick={(e) => {
    {/* console.log('e') */}
    }}>add to cart</button></a>
                
            </div>
            )
        
    }
}

function mapStateToProps( state ) { 
    return state;
}

export default connect( mapStateToProps, { getTent } )( TentDetails )