import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdminProducts.module.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/products');
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await axios.post('http://127.0.0.1:5001/products', product);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://127.0.0.1:5001/products/${id}`, updatedProduct);
      fetchProducts();
      setSelectedProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      console.log(`Deleting product with id: ${id}`);
      const response = await axios.delete(`http://127.0.0.1:5001/products/${id}`);
      console.log('Delete response:', response.data);
      
      setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  // const handleClearSelection = () => {
  //   setSelectedProduct(null);
  // };

  const handleFormSubmit = async (formData) => {
    if (selectedProduct && selectedProduct.product_id) {
      await handleUpdateProduct(selectedProduct.product_id, formData);
    } else {
      await handleAddProduct(formData);
    }
    setSelectedProduct(null);
  };

  return (
    <div className={styles.adminProducts}>
      <h2 className={styles.header}>Admin Products Management</h2>
      <ProductForm
        product={selectedProduct}
        onSubmit={handleFormSubmit}
      />
      <ProductList
        products={products}
        onSelectProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

const ProductForm = ({ product, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className={styles.inputField}
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Product Price"
        className={styles.inputField}
        required
      />
      <button type="submit" className={styles.submitButton}>
        {product ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

const ProductList = ({ products, onSelectProduct, onDeleteProduct }) => {
  const handleEditProduct = (product) => {
    onSelectProduct(product);
    window.scrollTo(0, 0);
  };

  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.product_id} className={styles.productItem}>
          <span className={styles.productDetails}>
            {product.name} - ${product.price} (ID: {product.product_id})
          </span>
          <button
            onClick={() => {
              console.log(`Edit button clicked for product ID: ${product.product_id}`); 
              handleEditProduct(product);
            }}
            className={styles.editButton}
          >
            Edit
          </button>
          <button
            onClick={() => {
              console.log(`Delete button clicked for product ID: ${product.product_id}`); 
              onDeleteProduct(product.product_id);
            }}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AdminProducts;