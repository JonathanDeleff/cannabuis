import React, { useState } from "react";

const AddProduct = ({ show, onClose, newProduct, setNewProduct }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product added:', data);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit}>
        <label>
          SKU:
          <input type="text" name="product_sku" value={newProduct.product_sku} onChange={handleChange} required />
        </label>
        <label>
          Brand:
          <input type="text" name="product_brand" value={newProduct.product_brand} onChange={handleChange} required />
        </label>
        <label>
          Title:
          <input type="text" name="product_title" value={newProduct.product_title} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="product_description" value={newProduct.product_description} onChange={handleChange} />
        </label>
        <label>
          Weight:
          <input type="number" name="product_weight" value={newProduct.product_weight} onChange={handleChange} />
        </label>
        <label>
          Equivalency:
          <input type="text" name="product_equivalency" value={newProduct.product_equivalency} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={newProduct.category} onChange={handleChange} required />
        </label>
        <label>
          Subcategory:
          <input type="text" name="subcategory" value={newProduct.subcategory} onChange={handleChange} required />
        </label>
        <label>
          Case Size:
          <input type="number" name="case_size" value={newProduct.case_size} onChange={handleChange} required />
        </label>
        <label>
          Inventory Level:
          <input type="number" name="inventory_level" value={newProduct.inventory_level} onChange={handleChange} required />
        </label>
        <label>
          Cost Price:
          <input type="number" name="cost_price" value={newProduct.cost_price} onChange={handleChange} required />
        </label>
        <label>
          Sell Price:
          <input type="number" name="sell_price" value={newProduct.sell_price} onChange={handleChange} required />
        </label>
        <label>
          Discount Price:
          <input type="number" name="discount_price" value={newProduct.discount_price} onChange={handleChange} />
        </label>
        <label>
          Tags:
          <input type="text" name="tags" value={newProduct.tags} onChange={handleChange} />
        </label>
        <label>
          Store ID:
          <input type="text" name="store_id" value={newProduct.store_id} onChange={handleChange} required />
        </label>
        <button type="submit">Add Product</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddProduct;
