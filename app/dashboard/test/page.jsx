"use client"; 
import { useState, useEffect } from "react";

import AddProduct from "@/components/products/addProduct";
import AddEmployee from "@/components/employees/addEmployee";

export default function Page() {

const [newProduct, setNewProduct] = useState({
    product_sku: "",
    product_brand: "",
    product_title: "",
    product_description: "",
    product_weight: "",
    product_equivalency: "",
    category_name: "",
    category_description: "",
    subcategory_name: "",
    subcategory_description: "",
    case_size: "",
    inventory_level: "",
    cost_price: "",
    sell_price: "",
    discount_price: "",
    tags: "",
    store_id: ""
});

const [newEmployee, setNewEmployee] = useState({
    emp_id: "",
    emp_fname: "",
    emp_lname: "",
    emp_email: "",
    emp_jobtitle: "",
    date_of_hire: "",
    password: "",
    store_id: "",
});

    useEffect(() => {
        console.log(newProduct);
        console.log(newEmployee);
    }, [newProduct, newEmployee])

;
    return (
        <div>
        <AddProduct newProduct={newProduct}/>
        <AddEmployee newEmployee={newEmployee}/>
        </div>
    );
}