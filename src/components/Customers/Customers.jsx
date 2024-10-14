import React, { useState, useEffect, useRef } from 'react';
import styles from './Customers.module.css';
import AddCustomer from './AddCustomer';
import { fetchCustomers, fetchCustomerById, saveCustomer, deleteCustomer, updateCustomer } from '../../../API/API';
import CustomerConfirmationModal from './CustomerConfirmationModal';
import { useHistory } from 'react-router-dom';

const Customers = () => {
    const history = useHistory();
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalCustomerDetails, setModalCustomerDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editCustomer, setEditCustomer] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        loadCustomers();
    }, []);

    useEffect(() => {
        if (isEditing && selectedCustomer) {
            setEditCustomer({
                name: selectedCustomer.name,
                email: selectedCustomer.email,
                phone: selectedCustomer.phone
            });
        }
    }, [isEditing, selectedCustomer]);

    const loadCustomers = async () => {
        try {
            const loadedCustomers = await fetchCustomers();
            setCustomers(loadedCustomers);
        } catch (error) {
            console.error('Error loading customers:', error);
        }
    };

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
        setErrorMessage('');
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveCustomer = async (customer) => {
        try {
            const savedCustomer = await saveCustomer(customer);
    
            if (savedCustomer && savedCustomer.customer_id) {
                setCustomers([...customers, savedCustomer]);
                
                setModalCustomerDetails({
                    customer_id: savedCustomer.customer_id,
                    name: savedCustomer.name,
                    email: savedCustomer.email,
                    phone: savedCustomer.phone
                });
    
                setShowModal(true);
    
                setTimeout(() => {
                    setShowModal(false);
                    closeModal();
                }, 6000);
    
            } else {
                console.error('Error saving customer: Saved customer data is undefined or incomplete.');
            }
        } catch (error) {
            console.error('Error saving customer:', error);
        }
    };

    
    const handleSearch = async () => {
        try {
            const customer = await fetchCustomerById(customerId);
            if (customer) {
                setSelectedCustomer(customer);
                setEditCustomer({
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone
                });
                setErrorMessage('');
                
                setTimeout(() => {
                    const customerDetailsElement = document.getElementById('customerDetails');
                    if (customerDetailsElement) {
                        customerDetailsElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                console.error('No customer found with ID:', customerId);
                setSelectedCustomer(null);
                setErrorMessage('Invalid customer ID. Please enter a valid ID.');
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
            setSelectedCustomer(null);
            setErrorMessage('Invalid customer ID. Please enter a valid ID.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        try {
            if (!selectedCustomer) {
                console.error('No customer selected for update.');
                return;
            }
    
            const updatedCustomer = {
                ...selectedCustomer,
                name: editCustomer.name,
                email: editCustomer.email,
                phone: editCustomer.phone
            };
    
            const result = await updateCustomer(updatedCustomer.customer_id, updatedCustomer);
    
            if (result) {
                setCustomers(customers.map((customer) => {
                    if (customer.customer_id === updatedCustomer.customer_id) {
                        return updatedCustomer;
                    }
                    return customer;
                }));
    
                setUpdateMessage('Update Successful!');
                setIsEditing(false);

                setSelectedCustomer(updatedCustomer);
    
                setTimeout(() => {
                    setUpdateMessage('');
                    closeModal();
                    
                }, 5000);
            } else {
                console.error('Update failed.');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };
    

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(true);
    };

    const handleDelete = async () => {
        try {
            if (!selectedCustomer) {
                console.error('No customer selected for delete.');
                return;
            }
            await deleteCustomer(selectedCustomer.customer_id);
    
            setCustomers(customers.filter((customer) => customer.customer_id !== selectedCustomer.customer_id));
    
            setDeleteSuccessMessage('Customer deleted successfully!');
            setSelectedCustomer(null);
            setShowDeleteConfirmation(false);
    
            setTimeout(() => {
                setDeleteSuccessMessage('');
                closeModal();
            }, 5000);
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };
    

    const closeModal = () => {
        setShowModal(false);
        setCustomerId('');
        setSelectedCustomer(null);
    };


    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Customers</h1>
            {updateMessage && <p className={styles.updateMessage}>{updateMessage}</p>} 
            
            <div className={styles.section}>
                <h2>Sign Up Today & Become A Fur Baby Member!</h2>
                <AddCustomer onSave={handleSaveCustomer} />
            </div>
            <div className={styles.section}>
            <h2 className={styles.header}>Customer Details</h2>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Enter Customer ID"
                        className={styles.inputBox}
                        value={customerId}
                        onChange={handleInputChange}
                    />
                    <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                </div>
                {updateMessage && (
                    <p className={`${styles.successMessage} ${styles.message}`}>{updateMessage}</p>
                )}
                {deleteSuccessMessage && <p className={styles.deleteMessage}>{deleteSuccessMessage}</p>}
                {errorMessage && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}
                {selectedCustomer && (
                    <div className={styles.customerDetails}>
                        
                        {!isEditing ? (
                            <>
                                <p>Name: {selectedCustomer.name}</p>
                                <p>Email: {selectedCustomer.email}</p>
                                <p>Phone: {selectedCustomer.phone}</p>
                                <p>Customer ID: {selectedCustomer.customer_id}</p>
                                <div className={styles.actions}>
                                    <button className={styles.button} onClick={() => setIsEditing(true)}>Update Details</button>
                                    <button className={styles.button} onClick={handleDeleteConfirmation}>Delete Customer</button>
                                    <button className={styles.button} onClick={() => setSelectedCustomer(null)}>Close Details</button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdate}>
                                <input
                                    type="text"
                                    name="name"
                                    value={editCustomer.name}
                                    onChange={handleEditInputChange}
                                    placeholder="Name"
                                    className={styles.editInput}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editCustomer.email}
                                    onChange={handleEditInputChange}
                                    placeholder="Email"
                                    className={styles.editInput}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={editCustomer.phone}
                                    onChange={handleEditInputChange}
                                    placeholder="Phone"
                                    className={styles.editInput}
                                />
                                <button className={styles.button} type="submit">Save Changes</button>
                                <button className={styles.button} type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </form>
                        )}
                        
                    </div>
                )}
            </div>
            {showModal && (
                <CustomerConfirmationModal
                isOpen={showModal}
                onRequestClose={closeModal}
                customer={modalCustomerDetails}
            />
            )}
            {showDeleteConfirmation && (
                <div className={styles.deleteConfirmation}>
                    <p>Are you sure you want to delete this customer?</p>
                    <button className={styles.deleteButton} onClick={handleDelete}>Confirm Delete</button>
                    <button className={styles.deleteButton} onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Customers;