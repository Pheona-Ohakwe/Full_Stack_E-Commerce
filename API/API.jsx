import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5001';

// Fetch all customers
export const fetchCustomers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};

// Fetch a customer by ID
export const fetchCustomerById = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/customers/${customerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching customer with ID ${customerId}:`, error);
        throw error;
    }
};

// Add or update a customer
export const saveCustomer = async (customer) => {
    try {
        if (customer.customer_id) {
            // Update existing customer
            const response = await axios.put(`${API_BASE_URL}/customers/${customer.customer_id}`, customer);
            return response.data;
        } else {
            // Add new customer
            const response = await axios.post(`${API_BASE_URL}/customers`, customer);
            return response.data;
        }
    } catch (error) {
        console.error('Error saving customer:', error);
        throw error;
    }
};

// Update customer
export const updateCustomer = async (customerId, updatedCustomer) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/customers/${customerId}`, updatedCustomer);
        return response.data;
    } catch (error) {
        console.error(`Error updating customer with ID ${customerId}:`, error);
        throw error;
    }
};

// Delete a customer by ID
export const deleteCustomer = async (customerId) => {
    try {
        await axios.delete(`${API_BASE_URL}/customers/${customerId}`);
    } catch (error) {
        console.error(`Error deleting customer with ID ${customerId}:`, error);
        throw error;
    }
};

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

// Fetch a product by name
export const fetchProductByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/name_of_product/${name}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with name ${name}:`, error);
        throw error;
    }
};

// Add or update a product
export const saveProduct = async (product) => {
    try {
        if (product.product_id) {
            // Update existing product
            const response = await axios.put(`${API_BASE_URL}/products/${product.product_id}`, product);
            return response.data;
        } else {
            // Add new product
            const response = await axios.post(`${API_BASE_URL}/products`, product);
            return response.data;
        }
    } catch (error) {
        console.error('Error saving product:', error);
        throw error;
    }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
    try {
        await axios.delete(`${API_BASE_URL}/products/${productId}`);
    } catch (error) {
        console.error(`Error deleting product with ID ${productId}:`, error);
        throw error;
    }
};

// Get all orders
export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Get orders by customer ID
export const fetchOrdersByCustomerId = async (customerId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders/${customerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching orders for customer with ID ${customerId}:`, error);
        throw error;
    }
};

// Add or update an order
export const saveOrder = async (order) => {
    try {
        if (order.order_id) {
            // Update existing order
            const response = await axios.put(`${API_BASE_URL}/orders/${order.order_id}`, order);
            return response.data;
        } else {
            // Add new order
            const response = await axios.post(`${API_BASE_URL}/orders`, order);
            return response.data;
        }
    } catch (error) {
        console.error('Error saving order:', error);
        throw error;
    }
};

// Delete an order by ID
export const deleteOrder = async (orderId) => {
    try {
        await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
    } catch (error) {
        console.error(`Error deleting order with ID ${orderId}:`, error);
        throw error;
    }
};
