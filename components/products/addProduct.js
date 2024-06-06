const AddProduct = ( {newProduct} ) => {
    return (
        <div>
            <form> 
                <input placeholder="sku" type="text" value={newProduct.product_sku}/>
                <input placeholder="brand" type="text" value={newProduct.product_brand}/> 
                <input placeholder="title" type="text" value={newProduct.product_title}/> 
                <input placeholder="description" type="text" value={newProduct.product_description}/> 
                <input placeholder="weight" type="text" value={newProduct.product_weight}/>  
                <input placeholder="equivalency" type="text" value={newProduct.product_equivalency}/> 
                <input placeholder="category name" type="text" value={newProduct.category_name}/> 
                <input placeholder="category description" type="text" value={newProduct.category_description}/>  
                <input placeholder="sub category name" type="text" value={newProduct.subcategory_name}/>  
                <input placeholder="subcategory description" type="text" value={newProduct.subcategory_description}/> 
                <input placeholder="case size" type="text" value={newProduct.case_size}/>  
                <input placeholder="inventory level" type="text" value={newProduct.inventory_level}/> 
                <input placeholder="cost price" type="text" value={newProduct.cost_price}/>  
                <input placeholder="sell price" type="text" value={newProduct.sell_price}/> 
                <input placeholder="discount price" type="text" value={newProduct.discount_price}/>  
                <input placeholder="Tags" type="text" value={newProduct.tags}/> 
                <input placeholder="Store Id" type="text" value={newProduct.store_id}/>
                <button type="submit" >Add Product </button>
            </form>
        </div>
    );
}
    export default AddProduct;