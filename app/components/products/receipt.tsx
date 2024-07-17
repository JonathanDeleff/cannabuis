// components/Receipt.tsx
import React from 'react';
import { SaleDetailsType } from '@/app/types/dashboardTypes/types';

const Receipt: React.FC<{ saleDetails: SaleDetailsType }> = ({ saleDetails }) => {
  return (
    <div>
      <h1>Receipt</h1>
      <p>Date: {saleDetails.date}</p>
      <p>Customer: {saleDetails.customer}</p>
      <p>Items:</p>
      <ul>
        {saleDetails.items.map((item, index) => (
          <li key={index}>
            {item.product_title} - ${item.sell_price}
          </li>
        ))}
      </ul>
      <p>Total: ${saleDetails.total}</p>
    </div>
  );
};

export default Receipt;
