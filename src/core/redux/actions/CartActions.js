// actions/cartActions.js
import * as cartService from '../../services/CartService';

export const FETCH_CART_SUCCESS = 'FETCH_CART_SUCCESS';
export const FETCH_CART_SERVICE = 'FETCH_CART_SERVICE';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const FETCH_COUNT_SUCCESS = 'FETCH_COUNT_SUCCESS';
export const UPDATE_QUANTITY_IN_CART = 'UPDATE_QUANTITY_IN_CART';

export const fetchCartFromServer = () => async dispatch => {
    const cart = await cartService.getCartFromServer();
    dispatch({ type: FETCH_CART_SUCCESS, payload: cart });
};

export const fetchCartFromService = () => dispatch => {
    const cart = cartService.getCart();
    dispatch({ type: FETCH_CART_SERVICE, payload: cart });
}

export const fetchCount = () => async dispatch => {
    const count = await cartService.getCountProductByProductInCart();
    dispatch({ type: FETCH_COUNT_SUCCESS, payload: count });
};

export const addToCart = (cartItem, quantity) => async dispatch => {
    await cartService.addCart(cartItem, quantity);
    await cartService.saveCartToServer(cartItem, quantity);
    dispatch(fetchCartFromService());
};

export const deleteFromCart = (cartItem) => async dispatch => {
    await cartService.deleteFromCartService(cartItem);
    await cartService.deleteCartItemToServer(cartItem.priceId)
    dispatch(fetchCartFromService());
};

export const clearCart = () => async dispatch => {
    await cartService.clearCart();
    dispatch(fetchCartFromService());
    dispatch(fetchCount());
}

export const updateQuantityInCart = (pricing, quantity) => async (dispatch) => {
    try {
        await cartService.setQuantityForPriceOfProduct(pricing, quantity);
        const cartItem = {
            "pricing": pricing,
            "quantity": quantity,
        };
        await cartService.updateQuantityCartItemToServer(pricing.priceId, cartItem);
        dispatch({ type: UPDATE_QUANTITY_IN_CART, payload: { pricing, quantity } });
    } catch (error) {
        console.error("Failed to update quantity in cart:", error);
    }
}