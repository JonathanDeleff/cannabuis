import { BsCartXFill } from "react-icons/bs";

const Cart = ({ products, onRemoveFromCart, handleQuantityChange }) => {
  return (
    <div>
      <table className="w-full">
      <thead>
          <tr>
            <th className="p-2 cursor-pointer">
                <div className="flex flex-row items-center"> 
                    Name (Price)
                </div>
            </th>
            <th className="p-2 cursor-pointer items-center w-14">
                <div className="flex flex-row">
                    Quantity
                </div>
            </th>
            <th className="p-2 cursor-pointer items-center">
                <div className="flex flex-row">
                    Actions
                </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_sku}>
              <td className="p-2">
                {product.product_title} (${product.sell_price * product.inventory_level})
              </td>
              <td className="p-2">
                <input 
                  type="number" 
                  value={product.inventory_level} 
                  onChange={(e) => handleQuantityChange(product.product_sku, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-700 focus:ring focus:ring-teal-700 focus:ring-opacity-50"
                />
              </td>
              <td className="p-2">
                <button 
                  className="bg-button text-white p-2 rounded-full" 
                  onClick={() => onRemoveFromCart(product.product_sku)}
                >
                  <BsCartXFill className="text-2xl"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
