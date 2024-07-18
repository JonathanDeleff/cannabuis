import { useState } from "react";
import { CustomerType } from "@/app/types/dashboardTypes/types";

type CustomerSearchProps = {
  show: boolean;
  onClose: () => void;
  onSelectCustomer: (customer: CustomerType) => void;
};

const CustomerSearch = ({ show, onClose, onSelectCustomer }: CustomerSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<CustomerType[]>([]);

  const handleSearch = async () => {
    try {
      const results = await fetch(`/api/customer/search?searchQuery=${encodeURIComponent(searchQuery)}`);
      const data = await results.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching customers:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      handleSearch();
    } else {
      setSearchResults([]);
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
        <h2>Search Customer</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Search by name, email, or phone"
        />
        <ul className="dropdown">
          {searchResults.map((customer) => (
            <li key={customer.customer_id} onClick={() => onSelectCustomer(customer)}>
              {customer.customer_fname} {customer.customer_lname} ({customer.customer_email})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerSearch;
