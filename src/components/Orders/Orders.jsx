
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Orders.module.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5001/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div>
        <h1 className={styles.header}>Current Orders</h1>
        <div className={styles.ordersContainer}>
            <h2 className={styles.header2}>Click on any order below to see the details of that order</h2>
            <ul className={styles.ordersList}>
                {orders.map((order) => (
                    <li key={order.order_id} className={styles.orderItem}>
                        <Link to={`/orders/${order.order_id}`} className={styles.orderLink}>
                            Order ID: {order.order_id} 
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/orders/new"> 
                <button className={styles.createOrderButton}>Create New Order</button>
            </Link>
        </div>
        </div>
    );
};

export default Orders;




