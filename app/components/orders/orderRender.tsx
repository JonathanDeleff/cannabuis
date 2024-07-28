import { OrderType } from '@/app/types/dashboardTypes/types';

interface OrdersProps {
    orders: OrderType[];
    onSelect: (order: OrderType) => void;
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getStatusClass = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-complete';
      case 'on route':
        return 'bg-pending';
      case 'Cancelled':
        return 'bg-cancelled';
      default:
        return 'bg-gray-500'; // Default styling if status is not recognized
    }
  };

const Orders: React.FC<OrdersProps> = ({ orders, onSelect }) => {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Order ID</td>
                        <td className="p-2.5">Order Status</td>
                        <td className="p-2.5">Order Date</td>
                        <td className="p-2.5">Order Amount</td>
                        <td className="p-2.5">Actions</td>

                    </tr>
                </thead>
                <tbody>
                    {orders?.map(order => (
                        <tr key={order.order_id}>
                            <td className="p-2.5">{order.order_id}</td>
                            <td className="p-2.5"> <span className={`rounded-full p-2 flex w-32 justify-center ${getStatusClass(order.order_status.toLowerCase())}`}>
                                    {capitalizeFirstLetter(order.order_status)}
                                </span></td>
                            <td className="p-2.5">{order.order_date}</td>
                            <td className="p-2.5">${order.order_cost}</td>
                            <td className="p-2.5">
                              <button className="mt-1 p-2.5 bg-button text-white rounded-lg" onClick={() => onSelect(order)} >
                                Select Order
                              </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;