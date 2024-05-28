const Product = ( {products} ) => {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Product Name</td>
                        <td className="p-2.5">Category</td>
                        <td className="p-2.5">Stock</td>
                        <td className="p-2.5">Price</td>
                        <td className="p-2.5">Description</td>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(product => (
                        <tr key={product.emp_id}>
                            <td className="p-2.5">{product.product_title}</td>
                            <td className="p-2.5">{product.product_equivalency}</td>
                            <td className="p-2.5">{product.inventory_level}</td>
                            <td className="p-2.5">${product.sell_price}</td>
                            <td className="p-2.5">{product.product_description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product;