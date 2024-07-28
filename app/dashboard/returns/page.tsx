"use client";

import { ProductType } from "@/app/types/dashboardTypes/types";
import { useState } from "react";



const ReturnsPage = () => {

  const [transactions, setTransactions] = useState([]);
  const [returnItems, setReturnItems] = useState<ProductType[]>([]);

  return (
    <main>
      Returns
    </main>
  );
};

export default ReturnsPage;
