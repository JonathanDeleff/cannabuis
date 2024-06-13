const AddProduct = ( {show, onCLose, newProduct, setNewProduct} ) => {

    const handleAddProduct = async (e) => {
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
            onCLose();

        } catch (error) {
            console.error('Error adding product:', error);

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    if (!show) return null;

    let subcategoryOptions = null;
    if (newProduct.category_id === 'C001') { // Cannabis Products
        subcategoryOptions = (
            <select className="w-60 p-1 bg-white text-black" name="subcategory_id" value={newProduct.subcategory_id} onChange={handleChange}>
                <option value="SC001">Oils</option>
                <option value="SC002">Edibles</option>
                <option value="SC003">Flower</option>
                <option value="SC004">Pre-rolls</option>
                <option value="SC007">Tinctures</option>
                <option value="SC009">Vapes</option>
                <option value="SC010">Beverages</option>
            </select>
        );
    } else if (newProduct.category_id === 'C002') { // CBD Products
        subcategoryOptions = (
            <select className="w-60 p-1 bg-white text-black" name="subcategory_id" value={newProduct.subcategory_id} onChange={handleChange}>
                <option value="SC006">Topicals</option>
                <option value="SC008">Bath Products</option>
                <option value="SC005">Capsules</option>
            </select>
        );
    }

    return (
            <form className="flex flex-col w-1/2 bg-bg border-border border-2 rounded-md p-2.5 m-2.5 text-white"> 
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
                Category: <select className="w-60 p-1 bg-white text-black" name="category_id" value={newProduct.category_id} onChange={handleChange}>
                    <option value="C001">Cannabis Products</option>
                    <option value="C002">CBD Products</option>
                </select>
            </div>
            <div className="flex justify-between m-1">
                Subcategory: {subcategoryOptions}
            </div>
                <div className="flex justify-between m-1">
                    Case Size: <input className="w-60 p-1 text-black" name="case_size" placeholder="case size" type="text" value={newProduct.case_size} onChange={handleChange}/>  
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
                    <button type="submit" onClick={handleAddProduct} className="bg-button rounded-lg w-44 p-1">Add Product </button>
                    <button onClick={onCLose} className="bg-cancelled rounded-lg w-44 p-1">Cancel</button>
                </div>
            </form>
    );
}
    export default AddProduct;