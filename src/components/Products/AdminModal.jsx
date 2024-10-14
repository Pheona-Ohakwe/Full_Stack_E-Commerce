import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../Products/AdminModal.module.css';

const AdminModal = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'Admin4545!') {
            onClose(); 
            history.push('/admin-products'); 
        } else {
            setError('Invalid username or password');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.adminModalOverlay}>
            <div className={styles.adminModalContent}>
                <button className={styles.adminCloseButton} onClick={onClose}>Close</button>
                <h2 className={styles.header}>Admin Sign-In</h2>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        className={styles.adminInputField}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.adminInputField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className={styles.adminSubmitButton}>Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminModal;
