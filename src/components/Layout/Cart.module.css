import { useState } from 'react';
import Modal from 'react-modal';
import FurBabyLogo from '../Layout/FurBabyLogo.png'
import styles from './CartModal.module.css';
import { useCart } from './Cart';

const CartModal = ({ onClose }) => {
    const { cartItems, removeFromCart, updateItemQuantity } = useCart();
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [guestCheckoutModalOpen, setGuestCheckoutModalOpen] = useState(false);
    const [guestCheckoutForm, setGuestCheckoutForm] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        cardName: '',
        cardNumber: '',
        cvc: '',
        zipCode: ''
    });

    const handleQuickCheckout = () => {
        setOrderModalOpen(true);
        setTimeout(() => {
            alert('Thank you for shopping with Fur Baby Boutique!');
            window.location.href = '/'; 
        }, 6000);
    };


    const handleGuestCheckout = () => {
        setGuestCheckoutModalOpen(true);
    };

    const handleOrderModalClose = () => {
        setOrderModalOpen(false);
        onClose();
    };

    const handleGuestCheckoutModalClose = () => {
        setGuestCheckoutModalOpen(false);
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
    };

    const handleQuantityChange = (productId, quantity) => {
        updateItemQuantity(productId, quantity);
    };

    const calculateSubTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTax = () => {
        const taxRate = 0.0485; 
        return calculateSubTotal() * taxRate;
    };

    const calculateTotal = () => {
        return calculateSubTotal() + calculateTax();
    };

    const OrderConfirmationModal = (
        <Modal isOpen={orderModalOpen} onRequestClose={handleOrderModalClose} className={styles.modal} overlayClassName={styles.modalOverlay}>
            <div className={styles.modalContent3}>
                <button className={styles.closeButton} onClick={handleOrderModalClose}>×</button>
                <br></br>
                <br></br>
                <h1>Thank you for shopping with Fur Baby Boutique!</h1>
                <br></br>
                <br></br>
                <br></br>
                <p>Your order has been placed & your items will arrive within 4-7 business days.</p>
                <br></br>
                <p>Confirmation Number: {Math.floor(Math.random() * 1e9)}</p>
                <img className={styles.logoimg} src={FurBabyLogo} alt='Logo Image'></img>
            </div>
        </Modal>
    );

    const GuestCheckoutModal = (
        <Modal isOpen={guestCheckoutModalOpen} onRequestClose={handleGuestCheckoutModalClose} className={styles.modal} overlayClassName={styles.modalOverlay}>
            <div className={styles.modalContent2}>
                <button className={styles.closeButton} onClick={handleGuestCheckoutModalClose}>×</button>
                <h2>Guest Checkout</h2>
                <form>
                    <label>Name:</label><br />
                    <input type="text" value={guestCheckoutForm.name} disabled /><br />
                    <label>Address:</label><br />
                    <input type="text" value={guestCheckoutForm.address} disabled /><br />
                    <label>Phone Number:</label><br />
                    <input type="tel" value={guestCheckoutForm.phoneNumber} disabled /><br />
                    <label>Name on Credit Card:</label><br />
                    <input type="text" value={guestCheckoutForm.cardName} disabled /><br />
                    <label>Credit Card Number:</label><br />
                    <input type="text" value={guestCheckoutForm.cardNumber} disabled /><br />
                    <label>CVC:</label><br />
                    <input type="text" value={guestCheckoutForm.cvc} disabled /><br />
                    <label>ZIP Code:</label><br />
                    <input type="text" value={guestCheckoutForm.zipCode} disabled /><br />
                </form>
            </div>
        </Modal>
    );

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <img src={FurBabyLogo} alt='Logo image'></img>
                <h2>Your Shopping Cart</h2>
                <div className={styles.cartItems}>
                    {cartItems.map(item => (
                        <div key={item.product_id} className={styles.cartItem}>
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                            <span>
                                <label className={styles.quantityLabel}>Quantity:</label>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value))}
                                    min="1"
                                    className={styles.quantityInput} 
                                />
                            </span>
                            <span>Total: ${(item.price * item.quantity).toFixed(2)}</span>
                            <button 
                                className={styles.removeButton} 
                                onClick={() => handleRemoveFromCart(item.product_id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.subTotal}>
                    <span>Subtotal:</span>
                    <span>${calculateSubTotal().toFixed(2)}</span>
                </div>
                <div className={styles.tax}>
                    <span>Tax (4.85%):</span>
                    <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className={styles.totalPrice}>
                    <strong>Total:</strong> ${calculateTotal().toFixed(2)}
                </div>
                <div className={styles.modalButtons}>
                    <button onClick={handleQuickCheckout}>Fur Baby Member Quick Checkout</button>
                    <button onClick={handleGuestCheckout}>Checkout as Guest</button>
                    <button onClick={onClose}>Continue Shopping</button>
                </div>

                {OrderConfirmationModal}
                {GuestCheckoutModal}
            </div>
        </div>
    );
};

export default CartModal;