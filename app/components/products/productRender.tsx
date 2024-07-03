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
      <table>
        <tbody>
          {products.map(product => (
            <tr key={product.product_sku}>
              <div className="flex flex-col border-2 border-border p-2 m-2 min-w-1/3 rounded-md shadow-md shadow-slate-600">
              <td className="p-2.5">{product.product_title} - {product.category}</td>
              <td className="p-2.5">{product.product_brand}</td>
              <td className="p-2.5">{product.inventory_level}</td>
              <td className="p-2.5">${product.sell_price}</td>
              <td className="p-2.5">
                <button 
                  className="bg-button text-white p-2 rounded-full" 
                  onClick={() => onAddToCart(product)}
                  >
                  <div className="text-2xl">
                  <BsCartPlusFill />
                  </div>
                </button>
              </td>
                </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

