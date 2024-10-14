import React from 'react';
import Modal from 'react-modal';
import styles from './CustomerConfirmationModal.module.css';
import FurBabyLogo from '../Layout/FurBabyLogo.png';

const CustomerConfirmationModal = ({ isOpen, onRequestClose, customer }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className={styles.modal} overlayClassName={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button className={styles.closeButton} onClick={onRequestClose}>×</button>
                <h1>Congratulations! You are now a Fur Baby Member!</h1>
                {customer && (
                    <>
                        <p>Customer ID: {customer.customer_id}</p>
                        <p>Customer Name: {customer.name}</p>
                        <p>Customer Email: {customer.email}</p>
                        <p>Customer Phone: {customer.phone}</p>
                    </>
                )}
                <img src={FurBabyLogo} alt="Fur Baby Logo" className={styles.logo} />
            </div>
        </Modal>
    );
};

export default CustomerConfirmationModal;