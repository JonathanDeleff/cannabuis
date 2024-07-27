"use client";
import { useState, useEffect, useMemo } from "react";
import { Search } from "@/app/components/dashboard/search";
import Pagination from "@/app/components/dashboard/pagination";
import Product from "@/app/components/products/productRender";
import Cart from "@/app/components/products/shoppingCart";
import Confirm from "@/app/components/products/confirmPage";
import AddProduct from "@/app/components/products/addProduct";
import AddCustomer from "@/app/components/products/addCustomer";
import CustomerSearch from "@/app/components/products/customerSearch";
import { ProductType, SortConfig, CustomerType } from "@/app/types/dashboardTypes/types";
import { useProducts } from "@/app/contexts/ProductsContext";
import { useSession } from "@/app/contexts/SessionContext";


const searchCustomer = async (searchQuery: string) => {
  try {
    const response = await fetch(`/api/customer/search?searchQuery=${encodeURIComponent(searchQuery)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching customer:', error);
    throw error;
  }
};


const ProductsPage = ( ) => {
  const { products, loading: productsLoading } = useProducts();
  const [cart, setCart] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: '', direction: 'ascending' });
  const [confirm, setConfirm] = useState<boolean>(false);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [showAddCustomer, setShowAddCustomer] = useState<boolean>(false);
  const [showCustomerSearch, setShowCustomerSearch] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType | null>(null);
  const [sendEmailReceipt, setSendEmailReceipt] = useState<boolean>(true);
  const [newProduct, setNewProduct] = useState<ProductType>({
    product_sku: '',
    product_brand: '',
    product_title: '',
    product_description: '',
    product_weight: '',
    product_equivalency: '',
    category: '',
    subcategory: '',
    case_size: '',
    inventory_level: 0,
    cost_price: 0,
    sell_price: 0,
    discount_price: 0,
    tags: '',
    store_id: ''
  });

  const [customerSearchQuery, setCustomerSearchQuery] = useState<string>('');
  const [customerSearchResults, setCustomerSearchResults] = useState<CustomerType[]>([]);
  const [mounted, setMounted] = useState(false);
  const { session, loading: sessionLoading } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];

    if (sortConfig.key) {
      sortableProducts.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof ProductType];
        const bValue = b[sortConfig.key as keyof ProductType];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'ascending'
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
    }

    return sortableProducts.filter(product =>
      product.product_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_equivalency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.product_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, sortConfig, searchQuery]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const cartEmpty = () => cart.length === 0;

  const totalCost = () => {
    let total = 0;
    if (!cartEmpty()) {
      cart.forEach((product) => total += product.discount_price * product.inventory_level);
    }
    return total;
  };

  const handleQuantityChange = (productSKU: string, newQuantity: number) => {
    setCart(currentProducts => currentProducts.map(product => {
      if (product.product_sku === productSKU) {
        return { ...product, inventory_level: newQuantity };
      }
      return product;
    }));
  };

  const handleAddToCart = (product: ProductType) => {
    let canAdd = true;

    cart.every(cartItem => {
      if (product.product_sku === cartItem.product_sku) {
        canAdd = false;
      }
      return canAdd;
    });

    if (canAdd) {
      setCart((prevProducts) => [...prevProducts, { ...product, inventory_level: 1 }]);
    }
  };

  const handleRemoveFromCart = (product_sku: string) => setCart(cart.filter((product) => product.product_sku !== product_sku));

  const handleClearCart = () => {
    setCart([]);
    setSelectedCustomer(null); // Clear the selected customer
    setConfirm(false);
  };

  const handleConfirmSell = async () => {
    try {
      // Prepare request data
      const requestData = {
        employee_id: session?.user?.id,
        store_id: session?.user?.storeId,
        customer_id: selectedCustomer?.customer_id || null, // Set to null if no customer selected
        transaction_cost: totalCost(),
        transaction_tax: totalCost() * 0.05,
        transaction_prov: 'AB',
        payment_method: 'Credit Card',
        transaction_status: 'Completed',
        cartItems: cart.map(item => ({
          product_sku: item.product_sku,
          transaction_quantity: item.inventory_level,
          transaction_cost: item.discount_price * item.inventory_level,
        })),
      };
  
      // Complete the sale
      const sellResponse = await fetch('/api/sell', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!sellResponse.ok) {
        throw new Error(`Failed to complete sale. Status: ${sellResponse.status}`);
      }
      // Only proceed with PDF generation and email if send receipt is checked
      if (sendEmailReceipt) {
        // Only proceed with PDF generation and email if a customer is selected
        if (selectedCustomer) {
          // Generate the receipt PDF using the API route
          const htmlContent = `
            <html>
              <head>
                <style>
                  /* Your styles here */
                </style>
              </head>
              <body>
                <h1>Receipt</h1>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <p>Customer Name: ${selectedCustomer.customer_fname || 'Unknown'} ${selectedCustomer.customer_lname || ''}</p>
                <p>Total Cost: ${totalCost().toFixed(2)}</p>
                <ul>
                  ${cart.map(item => `
                    <li>${item.product_title} - $${item.discount_price} x ${item.inventory_level}</li>
                  `).join('')}
                </ul>
              </body>
            </html>
          `;
  
          const pdfResponse = await fetch('/api/generatePdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              htmlContent,
            }),
          });
  
          if (!pdfResponse.ok) {
            const errorText = await pdfResponse.text();
            throw new Error(`Failed to generate receipt PDF. Status: ${pdfResponse.status}, Response: ${errorText}`);
          }
  
          const pdfData = await pdfResponse.json();
          const pdfBuffer = Buffer.from(pdfData.pdf, 'base64');
  
          // Send the email with the PDF attachment
          const emailResponse = await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: selectedCustomer.customer_email || '',
              subject: 'Your Receipt',
              text: 'Please find attached your receipt.',
              attachments: [
                {
                  filename: 'receipt.pdf',
                  content: pdfBuffer.toString('base64'),
                  encoding: 'base64',
                },
              ],
            }),
          });
  
          if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            throw new Error(`Failed to send email. Status: ${emailResponse.status}, Response: ${errorText}`);
          }
        }
      }
  
      // Clear the cart after successful transaction
      setCart([]);
    } catch (error) {
      console.error('Error confirming sale:', error);
    }
  };
  
  
  

  const handleCustomerSearch = async () => {
    try {
      const results = await searchCustomer(customerSearchQuery);
      setCustomerSearchResults(results);
    } catch (error) {
      console.error('Error searching customer:', error);
    }
  };

  const handleOpenAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleCloseAddProduct = () => {
    setShowAddProduct(false);
  };

  const handleOpenAddCustomer = () => {
    setShowAddCustomer(true);
  };

  const handleCloseAddCustomer = () => {
    setShowAddCustomer(false);
  };

  const handleOpenCustomerSearch = () => {
    setShowCustomerSearch(true);
  };

  const handleCloseCustomerSearch = () => {
    setShowCustomerSearch(false);
  };

  return (
    <div className="flex gap-2 mt-5 flex-col">
      <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-4/5 w-full">
        {mounted && (
          <Cart
            products={cart}
            onRemoveFromCart={handleRemoveFromCart}
            handleQuantityChange={handleQuantityChange}
            selectedCustomer={selectedCustomer}
            setSelectedCustomer={setSelectedCustomer}
            totalCost={totalCost()}
            onConfirmSell={handleConfirmSell}
            sendEmailReceipt={sendEmailReceipt}
            setSendEmailReceipt={setSendEmailReceipt}
        />
        )}
        {cartEmpty() ? (
          <p className="p-2.5">Cart is empty</p>
        ) : (
          <div className="flex flex-col items-center w-full">
            <p className="p-2.5">Total Cost: ${totalCost().toFixed(2)}</p>
            <button 
              className="p-2.5 bg-button text-black rounded-lg" 
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            {confirm ? (
              <Confirm 
                onConfirm={handleConfirmSell}
                onCancel={() => setConfirm(false)}
              />
            ) : (
              <button 
                className="mt-1 p-2.5 bg-button text-black rounded-lg" 
                onClick={() => setConfirm(true)}
              >
                Sell Items
              </button>
            )}
          </div>
        )}
      </div>
      {mounted && (
        <div className="bg-bgSoft p-5 rounded-lg mt-5 max-h-full w-full">
          <div className="flex items-center justify-between">
            <Search placeholder='Search for a product' setSearchQuery={setSearchQuery} />
            {!showAddProduct && ( 
              <button onClick={handleOpenAddProduct} className="p-2.5 bg-button text-black rounded-lg">Add New Product</button>
            )}
            <AddProduct show={showAddProduct} onClose={handleCloseAddProduct} newProduct={newProduct} setNewProduct={setNewProduct} />
            <AddCustomer show={showAddCustomer} onClose={handleCloseAddCustomer} onAddCustomer={setSelectedCustomer} />
            <CustomerSearch show={showCustomerSearch} onClose={handleCloseCustomerSearch} onSelectCustomer={setSelectedCustomer} />
          </div>
          <Product 
            products={sortedProducts} 
            onAddToCart={handleAddToCart} 
            requestSort={requestSort} 
            sortConfig={sortConfig} 
          />
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
