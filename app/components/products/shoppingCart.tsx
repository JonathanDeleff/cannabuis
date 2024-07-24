import { useState } from "react";
import CustomerSearch from "@/app/components/products/customerSearch";
import AddCustomer from "@/app/components/products/addCustomer";
import { ProductType, CustomerType } from "@/app/types/dashboardTypes/types";

type CartProps = {
  products: ProductType[];
  onRemoveFromCart: (productSKU: string) => void;
  handleQuantityChange: (productSKU: string, newQuantity: number) => void;
  selectedCustomer: CustomerType | null;
  setSelectedCustomer: (customer: CustomerType | null) => void;
  totalCost: number;
  onConfirmSell: () => void;
  sendEmailReceipt: boolean;
  setSendEmailReceipt: (value: boolean) => void;
};

export default function Cart({
  products,
  onRemoveFromCart,
  handleQuantityChange,
  selectedCustomer,
  setSelectedCustomer,
  totalCost,
  onConfirmSell,
  sendEmailReceipt,
  setSendEmailReceipt,
}: CartProps) {
  const [showCustomerSearch, setShowCustomerSearch] = useState<boolean>(false);
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);

  const handleOpenCustomerSearch = () => setShowCustomerSearch(true);
  const handleCloseCustomerSearch = () => setShowCustomerSearch(false);

  const handleSelectCustomer = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setShowCustomerSearch(false);
  };

  const handleOpenAddCustomer = () => setShowAddCustomer(true);
  const handleCloseAddCustomer = () => setShowAddCustomer(false);

  const handleAddCustomer = (customer: CustomerType) => {
    setSelectedCustomer(customer);
    setShowAddCustomer(false);
  };

  const cartEmpty = () => products.length === 0;

  return (
    <div className="cart">
      <h3>Shopping Cart</h3>
      {selectedCustomer ? (
        <p>Customer: {selectedCustomer.customer_fname} {selectedCustomer.customer_lname}</p>
      ) : (
        <div>
          <button onClick={handleOpenCustomerSearch} className="p-2.5 bg-button text-black rounded-lg">Search Customer</button>
          <CustomerSearch show={showCustomerSearch} onClose={handleCloseCustomerSearch} onSelectCustomer={handleSelectCustomer} />
          <button onClick={handleOpenAddCustomer} className="p-2.5 bg-button text-black rounded-lg">Add New Customer</button>
          <AddCustomer show={showAddCustomer} onClose={handleCloseAddCustomer} onAddCustomer={handleAddCustomer} />
        </div>
      )}
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
          {selectedCustomer && (
            <div>
              <label>
                <input 
                  type="checkbox" 
                  checked={sendEmailReceipt} 
                  onChange={(e) => setSendEmailReceipt(e.target.checked)}
                />
                Send Email Receipt
              </label>
              <button onClick={onConfirmSell} className="p-2.5 bg-button text-black rounded-lg">
                Confirm and Sell
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
