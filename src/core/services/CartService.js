import axiosInstance from "../../utils/axiosInstance";

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

export const deleteFromCartService = async (cartItem) => {
    cart.delete(cartItem);
}

export const clearCart = async () => {
    cart.clear();
}

export const getCountProductByProductInCart = async () => {
    return cart.size;
}


export const getCartFromServer = async () => {
    try {
        const userId = localStorage.getItem("id");
        const temp = await axiosInstance.get(`shopping-cart?userId=${userId}`);

        cart.clear();// Clear local cart before syncing

        if (temp.data !== ''){
            console.log('call')
            await temp.data.map(async (cartItem) => (
                await addCart(cartItem.pricing, cartItem.quantity)
            ));
            return temp.data;
        }
    } catch (e) {
        return [];
    }
}

export const saveCartToServer = async (pricing, quantity) => {
    try {
        const userId = localStorage.getItem("id");
        const cartItem = {
            "pricing" : pricing,
            "quantity" : quantity,
        }
        const temp = await axiosInstance.post(`shopping-cart?userId=${userId}`, cartItem);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
    }
}

export const deleteCartItemToServer = async (priceId) => {
    try {
        const userId = localStorage.getItem("id");
        const temp = await axiosInstance.delete(`shopping-cart/delete-from-cart?priceId=${priceId}&userId=${userId}`);
        console.log(temp.data);
        return temp.data;
    } catch (e) {
        console.log(e)
    }
}

export const updateQuantityCartItemToServer = async (priceId, cartItem) => {
    try {
        const userId = localStorage.getItem("id");
        const temp = await axiosInstance.put(`shopping-cart?userId=${userId}&priceId=${priceId}`, cartItem);
    } catch (e) {
        console.log(e)
    }
}