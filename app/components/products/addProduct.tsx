import { ProductType } from "@/app/types/dashboardTypes/types";
import React, { ChangeEvent, FormEvent } from "react";

interface AddProductProps {
  show: boolean;
  onClose: () => void;
  newProduct: ProductType;
  setNewProduct: React.Dispatch<React.SetStateAction<ProductType>>; // Ensure proper type for setNewProduct
}

const AddProduct: React.FC<AddProductProps> = ({ show, onClose, newProduct, setNewProduct }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value // Update specific field in newProduct state
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Convert numeric fields to numbers before sending
      const dataToSend = {
        ...newProduct,
        case_size: Number(newProduct.case_size),
        cost_price: Number(newProduct.cost_price),
        sell_price: Number(newProduct.sell_price),
        discount_price: Number(newProduct.discount_price),
        inventory_level: Number(newProduct.inventory_level),
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Product added:', data);
      onClose(); // Close the modal or form after successful submission
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error state or display an error message to the user
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="w-auto">
      <form onSubmit={handleSubmit} className="flex flex-col bg-bg text-white border-border border-2 rounded-md p-2.5 m-2.5 shadow-lg shadow-slate-700"> 
                <div className="flex justify-between m-1"> 
                    Product Sku: <input className="w-60 p-1 text-black" name="product_sku" placeholder="sku" type="text" value={newProduct.product_sku} onChange={handleChange}/>
                </div>
                <div className="flex justify-between m-1">
                   Brand: <input className="w-60 p-1 text-black" name="product_brand" placeholder="brand" type="text" value={newProduct.product_brand} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Product Title: <input className="w-60 p-1 text-black" name="product_title" placeholder="title" type="text" value={newProduct.product_title} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Description: <input className="w-60 p-1 text-black" name="product_description" placeholder="description" type="text" value={newProduct.product_description} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Weight: <input className="w-60 p-1 text-black" name="product_weight" placeholder="weight" type="text" value={newProduct.product_weight} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Equivalency: <input className="w-60 p-1 text-black" name="product_equivalency" placeholder="equivalency" type="text" value={newProduct.product_equivalency} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Category Name: <input className="w-60 p-1 text-black" name="category" placeholder="category name" type="text" value={newProduct.category} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    subcategory Name: <input className="w-60 p-1 text-black" name="subcategory" placeholder="subcategory name" type="text" value={newProduct.subcategory} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Case Size: <input className="w-60 p-1 text-black" name="case_size" placeholder="case size" type="number" value={newProduct.case_size} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Inventory Level: <input className="w-60 p-1 text-black" name="inventory_level" placeholder="inventory level" type="number" value={newProduct.inventory_level} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Cost: <input className="w-60 p-1 text-black" name="cost_price" placeholder="cost price" type="number" value={newProduct.cost_price} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Sell Price: <input className="w-60 p-1 text-black" name="sell_price" placeholder="sell price" type="number" value={newProduct.sell_price} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Discount Price: <input className="w-60 p-1 text-black" name="discount_price" placeholder="discount price" type="number" value={newProduct.discount_price} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Tags: <input className="w-60 p-1 text-black" name="tags" placeholder="Tags" type="text" value={newProduct.tags} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Store ID:<input className="w-60 p-1 text-black" name="store_id" placeholder="Store Id" type="text" value={newProduct.store_id} onChange={handleChange}/>
                </div>
                <div className="flex justify-center m-2 gap-2">
                    <button type="submit" className="bg-button rounded-lg w-44 p-1">Add Product </button>
                    <button onClick={onClose} className="bg-cancelled rounded-lg w-44 p-1">Cancel</button>
                </div>
            </form>
    </div>
  );
};

export default AddProduct;