const Product = ({ orders }) => {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Order ID</td>
                        <td className="p-2.5">Order Status</td>
                        <td className="p-2.5">Order Date</td>
                        <td className="p-2.5">Category</td>
                        <td className="p-2.5">Stock</td>
                        <td className="p-2.5">Price</td>
                        <td className="p-2.5">Description</td>
                    </tr>
                </thead>
                <tbody>
                    {products?.map(product => (
                        <tr key={product.product_sku}>
                            <td className="p-2.5">{product.product_sku}</td>
                            <td className="p-2.5">{product.product_title}</td>
                            <td className="p-2.5">{product.product_brand}</td>
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