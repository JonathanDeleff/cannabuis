"use client";
import DailySales from "@/app/components/dashboard/cards/dailySales";
import MostSoldToday from "@/app/components/dashboard/cards/mostSoldToday";
import WeeklySalesCategory from "@/app/components/dashboard/cards/weeklySalesCategory";
import Chart from "@/app/components/dashboard/chart";
import Transaction from "@/app/components/transactions/transactionRender";
import { useEffect, useState } from 'react';
import { TransactionType } from "../types/dashboardTypes/types";


export default function Dashboard() {

  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

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
          const total: number = +(transactionCost + transactionTax);
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
        <div className="flex gap-5 mt-5 h-screen">
            <div className="flex flex-col gap-5 w-full">
                <div className="flex gap-5 justify-between">
                    <DailySales />
                    <MostSoldToday />
                    <WeeklySalesCategory />
                </div>
                <Transaction transactions={transactions} limit={4}/>
                <Chart />
            </div>
        </div>
    );
}
