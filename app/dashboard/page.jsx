"use client";
import DailySales from "@/components/dashboard/cards/dailySales";
import MostSoldToday from "@/components/dashboard/cards/mostSoldToday";
import WeeklySalesCategory from "@/components/dashboard/cards/weeklySalesCategory";
import Chart from "../../components/dashboard/chart";
import Transactions from "../../components/transactions/transactionRender";
import Announcements from "../../components/dashboard/announcements";
import { useEffect, useState } from 'react';


export default function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

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
        <div className="flex gap-5 mt-5 h-screen">
            <div className="flex flex-col gap-5 w-4/5">
                <div className="flex gap-5 justify-between">
                    <DailySales />
                    <MostSoldToday />
                    <WeeklySalesCategory />
                </div>
                <Transactions transactions={transactions}/>
                <Chart />
            </div>
            <div className="flex w-1/5">
                <Announcements />
            </div>
        </div>
    );
}
