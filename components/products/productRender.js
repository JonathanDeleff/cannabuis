import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const Product = ({ products, onAddToCart, requestSort, sortConfig }) => {
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th className="p-2.5 cursor-pointer" onClick={() => requestSort('product_sku')}>
                <div className="flex flex-row items-center">
                    SKU {sortConfig.key === 'product_sku' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
                </div>
            </th>
            <th className="p-2.5 cursor-pointer" onClick={() => requestSort('product_title')}>
                <div className="flex flex-row items-center"> 
                    Product Name {sortConfig.key === 'product_title' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
                </div>
             
            </th>
            <th className="p-2.5 cursor-pointer" onClick={() => requestSort('product_brand')}>
                <div className="flex flex-row items-center">
                    Brand {sortConfig.key === 'product_brand' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
                </div>
            </th>
            <th className="p-2.5 cursor-pointer items-center" onClick={() => requestSort('product_equivalency')}>
                <div className="flex flex-row">
                    Category {sortConfig.key === 'product_equivalency' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
                </div>
            </th>
            <th className="p-2.5 cursor-pointer items-center" onClick={() => requestSort('inventory_level')}>
                <div className="flex flex-row">
                    Stock {sortConfig.key === 'inventory_level' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
                </div>
            </th>
            <th className="p-2.5 cursor-pointer items-center" onClick={() => requestSort('sell_price')}>
                <div className="flex flex-row">
                    Price {sortConfig.key === 'sell_price' && (sortConfig.direction === 'ascending' ? <MdArrowDropUp/> : <MdArrowDropDown/>)}
                </div>
            </th>
            <th className="p-2.5">Description</th>
            <th className="p-2.5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_sku}>
              <td className="p-2.5">{product.product_sku}</td>
              <td className="p-2.5">{product.product_title}</td>
              <td className="p-2.5">{product.product_brand}</td>
              <td className="p-2.5">{product.product_equivalency}</td>
              <td className="p-2.5">{product.inventory_level}</td>
              <td className="p-2.5">${product.sell_price}</td>
              <td className="p-2.5">{product.product_description}</td>
              <td className="p-2.5">
                <button 
                  className="bg-blue-500 text-white p-2 rounded" 
                  onClick={() => onAddToCart(product)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
