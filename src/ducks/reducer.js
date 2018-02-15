import axios from 'axios';

const initialState = {
    user: { },
    tent: [ ]
}

const GET_USER = 'GET_USER';
const GET_TENT = 'GET_TENT';

export function getUser( ) {

    let user = axios.get( '/auth/me' ).then( res => {
        console.log(res)
        return res.data
    } )

    return {
        type: GET_USER,
        payload: user
    }
}

export function getTent( tent ) {
    
        let user = axios.get( '/api/tent' ).then( res => {
            console.log(res)
            return res.data
        } )
    
        return {
            type: GET_TENT,
            payload: user
        }
    }

export default function reducer( state = initialState, action ) {
    switch ( action.type ) {
        case GET_USER + '_FULFILLED':
        return Object.assign( { }, state, { user: action.payload } )
        case GET_TENT + '_FULFILLED':
        return Object.assign( { }, state, { tent: action.payload } )
        default: 
        return state;
        
    }
}

