"use client";
import { Search } from "@/app/components/dashboard/search";
import Link from 'next/link';
import Pagination from "@/app/components/dashboard/pagination";
import Transaction from "@/app/components/transactions/transactionRender";
import { useState, useEffect } from "react";
import { TransactionType } from "@/app/types/dashboardTypes/types";
// connect to the database

export default function TransactionsPage() {
  
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

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

        const data: TransactionType[] = await response.json();
        
        const processedData = data.map(transaction => {
          const transactionCost = transaction.transaction_cost;
          const transactionTax = transaction.transaction_tax;
          const total = (transactionCost + transactionTax);
          const transaction_date = new Date(transaction.transaction_date).toISOString().split('T')[0];
          return {
            ...transaction,
            transaction_date: transaction_date,
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
    <div className="bg-bgSoft p-5 rounded-lg mt-5 shadow-lg shadow-slate-700">
      <div className="flex items-center justify-between">
        <Search placeholder='Search for a Transaction' setSearchQuery={setSearchQuery} />
      </div>
        <Transaction transactions={transactions} />
      <Pagination />
    </div>
  );
}
