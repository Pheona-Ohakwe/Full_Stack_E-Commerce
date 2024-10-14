import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import { Card, ListGroup } from 'react-bootstrap';
import styles from './OrderDetails.module.css'; 
import axios from 'axios';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrderDetails(orderId);
    }, [orderId]);

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`http://localhost:5001/orders/${orderId}`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch order details');
            // }
            // const data = await response.json();
            console.log('Fetched order data:', response.data); 
            setOrder(response.data);
        } catch (error) {
            setError('Error fetching order details');
            console.error('Error fetching order details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!order) {
        return <div>No order details available</div>;
    }

    return (
        <div className={styles.orderDetailsContainer}>
            <h2 className={styles.header}>Order Details</h2>
            <Card className={styles.card}>
                <Card.Body>
                    <Card.Title>Order ID Number: {order.order_id}</Card.Title>
                    <Card.Text>Date Order Was Placed: {order.date}</Card.Text>
                    <Card.Text>Customer ID Number: {order.customer_id}</Card.Text>
                    <Card.Title>Products Ordered (Listed By Product ID Numbers): {order.product_ids.join(', ')}</Card.Title>
                </Card.Body>
            </Card>
            <div className={styles.returnButtonContainer}> 
                
                <Link to="/orders">
                    <button className={styles.returnButton}>Return to Orders</button>
                </Link>
            </div>
        </div>
    );
};

export default OrderDetails;




