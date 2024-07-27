

const cart = new Map();

export const getCart = () => {
    return cart;
}

export const addCart = (cartItem, quantity) => {
    cart.set(cartItem, quantity);
}

export const setQuantityForPriceOfProduct = (cartItem, quantity) => {
    cart.set(cartItem, quantity);
}

export const deleteFromCart = (cartItem) => {
    cart.delete(cartItem);
}

export const getCountProductByProductInCart = () => {
    return cart.size;
}