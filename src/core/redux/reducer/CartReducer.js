import {
    FETCH_CART_SUCCESS,
    FETCH_CART_SERVICE,
    ADD_TO_CART,
    DELETE_FROM_CART,
    FETCH_COUNT_SUCCESS,
    UPDATE_QUANTITY_IN_CART
} from '../actions/CartActions';

const initialState = {
    cart: [],
    countProduct: 0,
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CART_SUCCESS:
            return { ...state, cartServer: action.payload };
        case FETCH_CART_SERVICE:
            return { ...state, cartService: action.payload };
        case FETCH_COUNT_SUCCESS:
            return { ...state, countProduct: action.payload };
        case ADD_TO_CART:
        case DELETE_FROM_CART:
            return { ...state };
        case UPDATE_QUANTITY_IN_CART:
            const { pricing, quantity } = action.payload;
            const cartWithUpdatedQuantity = state.cart.map(item => {
                if (item[0].priceId === pricing.priceId) {
                    return [item[0], quantity];
                }
                return item;
            });
            return {
                ...state,
                cart: cartWithUpdatedQuantity,
                countProduct: cartWithUpdatedQuantity.length
            };
        default:
            return state;
    }
};