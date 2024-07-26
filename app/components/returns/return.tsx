import type { ProductType } from '@/app/types/dashboardTypes/types';

type ReturnProps = {
    products: ProductType[];
}

export default function Return({ products }: ReturnProps) {
    return(
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">       
        {products.map(product => (
          <div key={product.product_sku}>
            <div className="border-2 border-border p-2 m-2 rounded-md shadow-md shadow-slate-600">
            <p className="p-2.5">{product.product_title} - {product.category}</p>
            <p className="p-2.5">{product.product_brand}</p> 
            <p className="p-2.5">{product.inventory_level}</p>
            <p className="p-2.5">${product.discount_price}</p>
              </div>
          </div>
        ))}
      </div> 
    )
}

