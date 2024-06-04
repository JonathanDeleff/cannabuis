const getStatusClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-complete';
      case 'Pending':
        return 'bg-pending';
      case 'Cancelled':
        return 'bg-cancelled';
      default:
        return 'bg-gray-500'; // Default styling if status is not recognized
    }
  };

const Orders = ({ orders }) => {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Order ID</td>
                        <td className="p-2.5">Order Status</td>
                        <td className="p-2.5">Order Date</td>
                        <td className="p-2.5">Order Amount</td>

                    </tr>
                </thead>
                <tbody>
                    {orders?.map(order => (
                        <tr key={order.order_id}>
                            <td className="p-2.5">{order.order_id}</td>
                            <td className="p-2.5"> <span className={`rounded-full p-2 flex w-32 justify-center ${getStatusClass(order.order_status)}`}>{order.order_status}</span></td>
                            <td className="p-2.5">{order.order_date}</td>
                            <td className="p-2.5">${order.order_cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Orders;