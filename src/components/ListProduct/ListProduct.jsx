import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ListProduct.css';

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://backend-crickart.onrender.com/api/products');
            console.log('Fetched products:', response.data); // For debugging
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError('Error fetching products');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await axios.delete(`https://backend-crickart.onrender.com/api/products/${id}`);
            fetchProducts(); // Refresh list after delete
        } catch (error) {
            setError('Error deleting product');
        }
    };

    if (loading) return <div className="loading">Loading products...</div>;

    return (
        <div className="products-list">
            <div className="list-header">
                <h2>Products</h2>
                <Link to="/admin/addproduct" className="add-new-btn">
                    Add New Product
                </Link>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="products-grid">
                {products.length === 0 ? (
                    <div className="no-products">No products found</div>
                ) : (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-image">
                                <img 
                                    src={`https://backend-crickart.onrender.com/${product.image}`} 
                                    alt={product.name}
                                    onError={(e) => {
                                        e.target.src = '/placeholder.png';
                                        console.log('Image failed to load:', product.image);
                                    }}
                                />
                            </div>
                            <div className="product-details">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-category">
                                    Category: {product.category}
                                </p>
                                <div className="product-prices">
                                    <span className="old-price">₹{product.old_price}</span>
                                    <span className="new-price">₹{product.new_price}</span>
                                </div>
                                <p className="product-stock">Stock: {product.stock}</p>
                            </div>
                            <div className="product-actions">
                                <button 
                                    onClick={() => handleDelete(product._id)} 
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListProduct;
