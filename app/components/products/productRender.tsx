import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { BsCartPlusFill } from "react-icons/bs";
import { ProductType, SortConfig } from "@/app/types/dashboardTypes/types";

interface ProductProps {
  products: ProductType[];
  onAddToCart: (product: ProductType) => void;
  requestSort: (key: string) => void;
  sortConfig: SortConfig;

}

export default function Product({ products, onAddToCart, requestSort, sortConfig }: ProductProps) {
  return (
    <div className="">
      <div className="flex flex-row justify-between">
        <p className="p-2.5 cursor-pointer" onClick={() => requestSort('product_sku')}>
            <div className="flex flex-row items-center">
                SKU {sortConfig.key === 'product_sku' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
            </div>
        </p>
        <p className="p-2.5 cursor-pointer" onClick={() => requestSort('product_title')}>
            <div className="flex flex-row items-center"> 
                Product Name {sortConfig.key === 'product_title' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
            </div>
          
        </p>
        <p className="p-2.5 cursor-pointer" onClick={() => requestSort('product_brand')}>
            <div className="flex flex-row items-center">
                Brand {sortConfig.key === 'product_brand' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
            </div>
        </p>
        <p className="p-2.5 cursor-pointer" onClick={() => requestSort('product_equivalency')}>
            <div className="flex flex-row items-center">
                Category {sortConfig.key === 'subcategory_name' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
            </div>
        </p>
        <p className="p-2.5 cursor-pointer" onClick={() => requestSort('inventory_level')}>
            <div className="flex flex-row items-center">
                Stock {sortConfig.key === 'inventory_level' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
            </div>
        </p>
        <p className="p-2.5 cursor-pointer" onClick={() => requestSort('sell_price')}>
            <div className="flex flex-row items-center">
                Price {sortConfig.key === 'discount_price' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
            </div>
        </p>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">       
        {products.map(product => (
          <div key={product.product_sku}>
            <div className="border-2 border-border p-2 m-2 rounded-md shadow-md shadow-slate-600">
            <p className="p-2.5">{product.product_title} - {product.category}</p>
            <p className="p-2.5">{product.product_brand}</p> 
            <p className="p-2.5">{product.inventory_level}</p>
            <p className="p-2.5">${product.discount_price}</p>
            <p className="p-2.5">
              <button 
                className="bg-button text-white p-2 rounded-full" 
                onClick={() => onAddToCart(product)}
                >
                <div className="text-2xl">
                <BsCartPlusFill />
                </div>
              </button>
            </p>
              </div>
          </div>
        ))}
      </div> 

    </div>
  );
}

