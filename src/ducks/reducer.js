import axios from 'axios';

const initialState = {
    user: {},
    tent: [],
    sleeping_bag: [],
    items: [],
    cart: []
}

const GET_USER = 'GET_USER';
const GET_TENT = 'GET_TENT';
const GET_SLEEPING_BAG = 'GET_SLEEPING_BAG';
const DELETE_ITEM = "DELETE_ITEM";
const GET_CART = 'GET_CART';
export function getUser() {

    let user = axios.get('/auth/me').then(res => {
        console.log(res)
        return res.data
    })

    return {
        type: GET_USER,
        payload: user
    }
}

export function getCart() {
    let payload = axios
        .get("/api/cart")
        .then(resp => {
            console.log(resp);
            return resp.data
        })
        .catch(console.log);
    return {
        type: GET_CART,
        payload: payload
    }
}

export function getTent(tent) {

    let user = axios.get('/api/tent').then(res => {
        console.log(res)
        return res.data
    })

    return {
        type: GET_TENT,
        payload: user
    }
}

export function getSleepingBag(sleeping_bag) {
    let user = axios.get('/api/sleepybag').then(res => {
        console.log(res.data)
        return res.data
    })
    return {
        type: GET_SLEEPING_BAG,
        payload: user
    }
}


export function deleteItems(id) {
    // id = c.cart_item_id = 7
    // /api/delete/:id
    // /api/delete/7
    let items = axios.delete('/api/delete/' + id).then(res => {
        return id
    }).catch(console.log)

    return {
        type: DELETE_ITEM,
        payload: items
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {
                user: action.payload
            })
        case GET_TENT + '_FULFILLED':
            return Object.assign({}, state, {
                tent: action.payload
            })
        case GET_SLEEPING_BAG + '_FULFILLED':
            return Object.assign({}, state, {
                sleeping_bag: action.payload
            })
        case DELETE_ITEM + '_FULFILLED':
            console.log(action.payload)
            let tempCart = state.cart.slice().filter( c => c.cart_item_id !== action.payload)
            return Object.assign( {}, state, { cart: tempCart });
        case GET_CART + '_FULFILLED':
            console.log(action.payload)
            return Object.assign({}, state, {
                cart: action.payload
            })
        default:
            return state;

    }
}