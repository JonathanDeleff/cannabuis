import { useState, useEffect } from 'react';

const AddProduct = ({ show, onClose, newProduct, setNewProduct }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newSubcategory, setNewSubcategory] = useState('');
    const [isNewCategory, setIsNewCategory] = useState(false);
    const [isNewSubcategory, setIsNewSubcategory] = useState(false);
    const [showCategoryInput, setShowCategoryInput] = useState(false);
    const [showSubcategoryInput, setShowSubcategoryInput] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/products/categories', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched categories:', data); // Debugging log
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchSubcategories = async () => {
            try {
                const response = await fetch('/api/products/subcategories', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched subcategories:', data); // Debugging log
                setSubcategories(data);
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        };

        fetchCategories();
        fetchSubcategories();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (isNewCategory) {
            alert(`New category '${newProduct.category_id}' added. Please confirm.`);
            setIsNewCategory(false);
            return;
        }
        if (isNewSubcategory) {
            alert(`New subcategory '${newProduct.subcategory_id}' added. Please confirm.`);
            setIsNewSubcategory(false);
            return;
        }
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });

        if (name === 'category_id') {
            const isExistingCategory = categories.some(category => category.category_id === value);
            setIsNewCategory(!isExistingCategory);
        }

        if (name === 'subcategory_id') {
            const isExistingSubcategory = subcategories.some(subcategory => subcategory.subcategory_id === value);
            setIsNewSubcategory(!isExistingSubcategory);
        }
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setNewCategory(value);
        setNewProduct({ ...newProduct, category_id: value });

        const isExistingCategory = categories.some(category => category.category_name === value);
        setIsNewCategory(!isExistingCategory);
    };

    const handleSubcategoryChange = (e) => {
        const { value } = e.target;
        setNewSubcategory(value);
        setNewProduct({ ...newProduct, subcategory_id: value });

        const isExistingSubcategory = subcategories.some(subcategory => subcategory.subcategory_name === value);
        setIsNewSubcategory(!isExistingSubcategory);
    };

    if (!show) return null;

    return (
        <form className="flex flex-col w-1/2 bg-bg border-border border-2 rounded-md p-2.5 m-2.5 text-white" onSubmit={handleAddProduct}>
            <div className="flex justify-between m-1">
                Product Sku: <input className="w-60 p-1 text-black" name="product_sku" placeholder="sku" type="text" value={newProduct.product_sku} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Brand: <input className="w-60 p-1 text-black" name="product_brand" placeholder="brand" type="text" value={newProduct.product_brand} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Product Title: <input className="w-60 p-1 text-black" name="product_title" placeholder="title" type="text" value={newProduct.product_title} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Description: <input className="w-60 p-1 text-black" name="product_description" placeholder="description" type="text" value={newProduct.product_description} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Weight: <input className="w-60 p-1 text-black" name="product_weight" placeholder="weight" type="text" value={newProduct.product_weight} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Equivalency: <input className="w-60 p-1 text-black" name="product_equivalency" placeholder="equivalency" type="text" value={newProduct.product_equivalency} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Category:
                <div className="flex flex-col w-60">
                    {showCategoryInput ? (
                        <input className="p-1 text-black" name="category_id" placeholder="Enter category" type="text" value={newCategory} onChange={handleCategoryChange} />
                    ) : (
                        <select className="p-1 text-black" name="category_id" value={newProduct.category_id} onChange={handleChange}>
                            <option value="">Select category</option>
                            {categories.map(category => (
                                <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                            ))}
                            <option value="new">Add new category</option>
                        </select>
                    )}
                    {isNewCategory && <span className="text-red-500">New category, please confirm</span>}
                    {showCategoryInput && <button type="button" onClick={() => setShowCategoryInput(false)}>Select from existing</button>}
                    {!showCategoryInput && <button type="button" onClick={() => setShowCategoryInput(true)}>Add new category</button>}
                </div>
            </div>
            <div className="flex justify-between m-1">
                Subcategory:
                <div className="flex flex-col w-60">
                    {showSubcategoryInput ? (
                        <input className="p-1 text-black" name="subcategory_id" placeholder="Enter subcategory" type="text" value={newSubcategory} onChange={handleSubcategoryChange} />
                    ) : (
                        <select className="p-1 text-black" name="subcategory_id" value={newProduct.subcategory_id} onChange={handleChange}>
                            <option value="">Select subcategory</option>
                            {subcategories.map(subcategory => (
                                <option key={subcategory.subcategory_id} value={subcategory.subcategory_id}>{subcategory.subcategory_name}</option>
                            ))}
                            <option value="new">Add new subcategory</option>
                        </select>
                    )}
                    {isNewSubcategory && <span className="text-red-500">New subcategory, please confirm</span>}
                    {showSubcategoryInput && <button type="button" onClick={() => setShowSubcategoryInput(false)}>Select from existing</button>}
                    {!showSubcategoryInput && <button type="button" onClick={() => setShowSubcategoryInput(true)}>Add new subcategory</button>}
                </div>
            </div>
            <div className="flex justify-between m-1">
                Case Size: <input className="w-60 p-1 text-black" name="case_size" placeholder="case size" type="number" value={newProduct.case_size} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Inventory Level: <input className="w-60 p-1 text-black" name="inventory_level" placeholder="inventory level" type="number" value={newProduct.inventory_level} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Cost: <input className="w-60 p-1 text-black" name="cost_price" placeholder="cost price" type="number" value={newProduct.cost_price} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Sell Price: <input className="w-60 p-1 text-black" name="sell_price" placeholder="sell price" type="number" value={newProduct.sell_price} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Discount Price: <input className="w-60 p-1 text-black" name="discount_price" placeholder="discount price" type="number" value={newProduct.discount_price} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Tags: <input className="w-60 p-1 text-black" name="tags" placeholder="Tags" type="text" value={newProduct.tags} onChange={handleChange} />
            </div>
            <div className="flex justify-between m-1">
                Store ID:<input className="w-60 p-1 text-black" name="store_id" placeholder="Store Id" type="text" value={newProduct.store_id} onChange={handleChange} />
            </div>
            <div className="flex justify-center m-2 gap-2">
                <button type="submit" onClick={onClose} className="bg-button rounded-lg w-44 p-1">Add Product</button>
                <button type="button" onClick={onClose} className="bg-cancelled rounded-lg w-44 p-1">Cancel</button>
            </div>
        </form>
    );
}

export default AddProduct;
