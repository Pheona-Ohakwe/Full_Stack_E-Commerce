import { createContext, useContext, useState } from 'react';

const Cart = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.product_id === item.product_id);
        
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity += item.quantity;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, item]);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(cartItem => cartItem.product_id !== productId);
        setCartItems(updatedCartItems);
    };

    const updateItemQuantity = (productId, quantity) => {
        const updatedCartItems = cartItems.map(cartItem => 
            cartItem.product_id === productId ? { ...cartItem, quantity } : cartItem
        ).filter(cartItem => cartItem.quantity > 0);
        setCartItems(updatedCartItems);
    };

    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Cart.Provider value={{ cartItems, addToCart, removeFromCart, updateItemQuantity, cartCount }}>
            {children}
        </Cart.Provider>
    );
};

export const useCart = () => {
    return useContext(Cart);
};