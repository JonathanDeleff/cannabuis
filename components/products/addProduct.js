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

    return (
            <form className="flex flex-col w-1/2 bg-bgSoft border-border border-2 rounded-md p-2.5 m-2.5"> 
                <div className="flex justify-between m-1"> 
                    Product Sku: <input className="w-60 p-1 text-black" name="product_sku" placeholder="sku" type="text" value={newProduct.product_sku} onChange={handleChange}/>
                </div>
                <div className="flex justify-between m-1">
                   Brand: <input className="w-60 p-1" name="product_brand" placeholder="brand" type="text" value={newProduct.product_brand} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Product Title: <input className="w-60 p-1" name="product_title" placeholder="title" type="text" value={newProduct.product_title} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Description: <input className="w-60 p-1" name="product_description" placeholder="description" type="text" value={newProduct.product_description} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Weight: <input className="w-60 p-1" name="product_weight" placeholder="weight" type="text" value={newProduct.product_weight} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Equivalency: <input className="w-60 p-1" name="product_equivalency" placeholder="equivalency" type="text" value={newProduct.product_equivalency} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Category Name: <input className="w-60 p-1" name="category_name" placeholder="category name" type="text" value={newProduct.category_name} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Category Description: <input className="w-60 p-1" name="category_description" placeholder="category description" type="text" value={newProduct.category_description} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    subcategory Name: <input className="w-60 p-1" name="subcategory_name" placeholder="subcategory name" type="text" value={newProduct.subcategory_name} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Subcategory Description: <input className="w-60 p-1" name="subcategory_description" placeholder="subcategory description" type="text" value={newProduct.subcategory_description} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Case Size: <input className="w-60 p-1" name="case_size" placeholder="case size" type="text" value={newProduct.case_size} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Inventory Level: <input className="w-60 p-1" name="inventory_level" placeholder="inventory level" type="text" value={newProduct.inventory_level} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Cost: <input className="w-60 p-1" name="cost_price" placeholder="cost price" type="text" value={newProduct.cost_price} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Sell Price: <input className="w-60 p-1" name="sell_price" placeholder="sell price" type="text" value={newProduct.sell_price} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Discount Price: <input className="w-60 p-1" name="discount_price" placeholder="discount price" type="text" value={newProduct.discount_price} onChange={handleChange}/>  
                </div>
                <div className="flex justify-between m-1">
                    Tags: <input className="w-60 p-1" name="tags" placeholder="Tags" type="text" value={newProduct.tags} onChange={handleChange}/> 
                </div>
                <div className="flex justify-between m-1">
                    Store ID:<input className="w-60 p-1" name="store_id" placeholder="Store Id" type="text" value={newProduct.store_id} onChange={handleChange}/>
                </div>
                <div className="flex justify-center m-2 gap-2">
                    <button type="submit" onClick={handleAddProduct} className="bg-button rounded-lg w-44 p-1">Add Product </button>
                    <button onClick={onCLose} className="bg-cancelled rounded-lg w-44 p-1">Cancel</button>
                </div>
            </form>
    );
}
    export default AddProduct;