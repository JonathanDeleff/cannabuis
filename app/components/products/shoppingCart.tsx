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
  clearCustomer: () => void;
};

export default function Cart({
  products,
  onRemoveFromCart,
  handleQuantityChange,
  selectedCustomer,
  setSelectedCustomer,
  sendEmailReceipt,
  setSendEmailReceipt,
  clearCustomer
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
    <div>
      Customer: {selectedCustomer.customer_fname} {selectedCustomer.customer_lname}
      <button
        onClick={clearCustomer}
        className="bg-red-500 rounded-md p-1 ml-2"
      > Remove</button>
    </div>
  ) : (
    <div className="m-2">
      <button
        onClick={handleOpenCustomerSearch}
        className="p-2.5 bg-button text-black rounded-lg mr-2"
      >
        Search Customer
      </button>
      <CustomerSearch
        show={showCustomerSearch}
        onClose={handleCloseCustomerSearch}
        onSelectCustomer={handleSelectCustomer}
      />
      <button onClick={handleOpenAddCustomer} className="p-2.5 bg-button text-black rounded-lg">
        Add New Customer
      </button>
      <AddCustomer
        show={showAddCustomer}
        onClose={handleCloseAddCustomer}
        onAddCustomer={handleAddCustomer}
      />
    </div>
  )}
  {cartEmpty() ? (
    <div></div>
  ) : (
    <div className="flex flex-col items-center">
      <ul className="w-full max-w-md">
        {products.map((product) => (
          <li key={product.product_sku}>
            <span>{product.product_title} - Quantity:</span>
              <input
                className="w-16 ml-2"
                type="number"
                value={product.inventory_level}
                onChange={(e) => handleQuantityChange(product.product_sku, Number(e.target.value))}
              />
              <button
                className="bg-red-500 rounded-md p-1 ml-2"
                onClick={() => onRemoveFromCart(product.product_sku)}
              >
                Remove
              </button>
          </li>
        ))}
      </ul>
      {selectedCustomer && (
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={sendEmailReceipt}
              onChange={(e) => setSendEmailReceipt(e.target.checked)}
              className="mr-2"
            />
            Send Email Receipt
          </label>
        </div>
      )}
    </div>
  )}
</div>

  );
}
