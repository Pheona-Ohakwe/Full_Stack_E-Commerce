
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import styles from './OrderForm.module.css';
import FurBabyLogo from "../Layout/FurBabyLogo.png"

const OrderForm = () => {
    const history = useHistory();

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [formData, setFormData] = useState({
        customer_id: '',
        date: '',
    });

    const [showModal, setShowModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5001/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProductChange = (e, productId) => {
        const { checked } = e.target;
        if (checked) {
            const selectedProduct = products.find((product) => product.product_id === productId);
            setSelectedProducts([...selectedProducts, selectedProduct]);
        } else {
            const updatedSelectedProducts = selectedProducts.filter(
                (product) => product.product_id !== productId
            );
            setSelectedProducts(updatedSelectedProducts);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            ...formData,
            product_ids: selectedProducts.map((product) => product.product_id),
        };

        try {
            const response = await fetch('http://localhost:5001/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            const data = await response.json();
            setOrderDetails({ ...orderData, order_id: data.order_id });
            setShowModal(true);

            setTimeout(() => {
                setFormData({
                    customer_id: '',
                    date: '',
                });
                setSelectedProducts([]);
                setShowModal(false);
            }, 5000);

        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            
            <div className={styles.backToOrdersContainer}>
            <h2 className={styles.header}>Create New Order</h2>
                <Button className={styles.backToOrdersButton} variant="secondary" onClick={() => history.push('/orders')}>
                    Back to Orders
                </Button>
                
            </div>
            
            <div className={styles.formWrapper}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="customer_id" className={styles.formGroup}>
                        <Form.Label className={styles.customerIDHeader}>Customer ID Number</Form.Label>
                        <br></br>
                        <Form.Control
                            type="text"
                            name="customer_id"
                            
                            placeholder="Enter customer ID number"
                            value={formData.customer_id}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="date" className={styles.formGroup}>
                        <Form.Label className={styles.dateHeader}>Date</Form.Label>
                        <br></br>
                        <Form.Control
                            type="date"
                            name="date"
                            
                            value={formData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                    <br></br>
                    <br></br>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label className={styles.productListHeader}>Select Products To Add To Your Order</Form.Label>
                        {products.map((product) => (
                            <Form.Check
                                key={product.product_id}
                                className={styles.productList}
                                type="checkbox"
                                id={`product-${product.product_id}`}
                                label={`${product.name}  |  Product Id: ${product.product_id}  |  $${product.price}`}
                                onChange={(e) => handleProductChange(e, product.product_id)}
                                checked={selectedProducts.some(p => p.product_id === product.product_id)}
                            />
                        ))}
                    </Form.Group>

                    <Button variant="primary" type="submit" className={styles.submitButton}>
                        Submit Order
                    </Button>
                </Form>
            </div>
            
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                className={styles.modal}
            >
                <Modal.Header closeButton className={styles.modalHeader}>
                <img src={FurBabyLogo} alt="Fur Baby Boutique Logo" className={styles.logo}/>
                    <Modal.Title className={styles.modalTitle}>Order Created Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    {orderDetails && (
                        <>
                            <p className={styles.modalText}>Order ID Number: {orderDetails.order_id}</p>
                            <p className={styles.modalText}>Date: {orderDetails.date}</p>
                            <p className={styles.modalText}>Customer ID Number: {orderDetails.customer_id}</p>
                            <p className={styles.modalText}>Product IDs: {orderDetails.product_ids.join(', ')}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className={styles.modalFooter}>
                    <Button className={styles.closeButton} variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            </div> 
    );
};

export default OrderForm;

