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

const Transaction = ( {transactions} ) => {
    return (
        <div>
            <table className="w-full bg-bgSoft rounded-lg">
                <thead>
                    <tr>
                        <td className="p-2.5">Customer Name</td>
                        <td className="p-2.5">Status</td>
                        <td className="p-2.5">Date</td>
                        <td className="p-2.5">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map(transaction => (
                        <tr key={transaction.transaction_id} className="p-2.5 m-2.5">
                            <td className="p-2.5">{transaction.customer_fname + " " + transaction.customer_lname}</td>
                            <td className="p-2.5">
                            <span className={`rounded-full p-2 flex w-32 justify-center ${getStatusClass(transaction.transaction_status)}`}>{transaction.transaction_status}</span>
                                </td>
                            <td className="p-2.5">{transaction.created_at}</td>
                            <td className="p-2.5">${transaction.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Transaction;