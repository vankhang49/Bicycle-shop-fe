

const cart = new Map();

export const getCart = () => {
    return cart;
}

export const addCart = async (cartItem, quantity) => {
    cart.set(cartItem, quantity);
}

export const setQuantityForPriceOfProduct = async (cartItem, quantity) => {
    cart.set(cartItem, quantity);
}

export const deleteFromCart = async (cartItem) => {
    cart.delete(cartItem);
}

export const getCountProductByProductInCart = async () => {
    return cart.size;
}