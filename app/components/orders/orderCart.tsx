import { ProductType } from "@/app/types/dashboardTypes/types";

type CartProps = {
  products: ProductType[];
  onRemoveFromCart: (productSKU: string) => void;
  handleQuantityChange: (productSKU: string, newQuantity: number) => void;
  totalCost: number;
  onConfirmOrder: () => void;
};

export default function OrderCart({
  products,
  onRemoveFromCart,
  handleQuantityChange,
  totalCost,
  onConfirmOrder,
}: CartProps) {

  const cartEmpty = () => products.length === 0;

  return (
    <div className="cart">
      <h3>Order Cart</h3>
      {cartEmpty() ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.product_sku}>
                {product.product_title} - Quantity: 
                <input 
                  type="number" 
                  value={product.inventory_level} 
                  onChange={(e) => handleQuantityChange(product.product_sku, Number(e.target.value))} 
                />
                <button onClick={() => onRemoveFromCart(product.product_sku)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total Cost: ${totalCost.toFixed(2)}</p>
          <button onClick={onConfirmOrder} className="p-2.5 bg-button text-black rounded-lg">
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}
