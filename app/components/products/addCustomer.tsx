"use client";
import { useState } from "react";
import { CustomerType } from "@/app/types/dashboardTypes/types";

type AddCustomerProps = {
  show: boolean;
  onClose: () => void;
  onAddCustomer: (customer: CustomerType) => void;
};

const AddCustomer = ({ show, onClose, onAddCustomer }: AddCustomerProps) => {
  const [customer, setCustomer] = useState<CustomerType>({
    customer_fname: "",
    customer_lname: "",
    customer_email: "",
    customer_phone: "",
    street_address: "",
    city: "",
    province: "",
    postal_code: "",
    store_id: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch("/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newCustomer = await response.json();
      onAddCustomer(newCustomer);
      onClose();
    } catch (error) {
      console.error("Failed to add customer:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Customer</h2>
        <input
          type="text"
          name="customer_fname"
          value={customer.customer_fname}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="customer_lname"
          value={customer.customer_lname}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="customer_email"
          value={customer.customer_email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="customer_phone"
          value={customer.customer_phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <input
          type="text"
          name="street_address"
          value={customer.street_address}
          onChange={handleInputChange}
          placeholder="Street Address"
        />
        <input
          type="text"
          name="city"
          value={customer.city}
          onChange={handleInputChange}
          placeholder="City"
        />
        <input
          type="text"
          name="province"
          value={customer.province}
          onChange={handleInputChange}
          placeholder="Province"
        />
        <input
          type="text"
          name="postal_code"
          value={customer.postal_code}
          onChange={handleInputChange}
          placeholder="Postal Code"
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
    </div>
  );
};

export default AddCustomer;
