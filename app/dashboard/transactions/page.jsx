"use client";
import Search from "@/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/components/dashboard/pagination";
import Transaction from "@/components/transactions/transactionRender";
import { useState, useEffect } from "react";
// connect to the database

export default function TransactionsPage() {
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions', {
          method: 'GET',
        });
        setLoading(false);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        const processedData = data.map(transaction => {
          const transactionCost = parseFloat(transaction.transaction_cost);
          const transactionTax = parseFloat(transaction.transaction_tax);
          const total = (transactionCost + transactionTax).toFixed(2);
          return {
            ...transaction,
            created_at: transaction.created_at.split('T')[0],
            total: total,
          };
        });

        setTransactions(processedData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchTransactions();
  }, []);
      
  if (loading) {
    return <div>Loading...</div>;
  }
      
    

  return (
    <div className="bg-bgSoft p-5 rounded-lg mt-5">
      <div className="flex items-center justify-between">
        <Search placeholder='Search for a Transaction' />
        <Link href={"/components/products/addProduct"}>
          <button className="p-2.5 bg-button text-black rounded-lg">Add New</button>
        </Link>
      </div>
        <Transaction transactions={transactions} />
      <Pagination />
    </div>
  );
}
