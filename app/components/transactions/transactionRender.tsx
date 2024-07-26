import { TransactionType } from '@/app/types/dashboardTypes/types';

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-complete';
    case 'Returned':
      return 'bg-pending';
    case 'Cancelled':
      return 'bg-cancelled';
    default:
      return 'bg-gray-500'; // Default styling if status is not recognized
  }
};

const Transaction = ({ transactions, limit }: { transactions: TransactionType[], limit?: number }) => {
  
  const sortedTransactions = transactions.sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime());
  const displayedTransactions = limit ? sortedTransactions.slice(0, limit) : sortedTransactions;

  return (
    <div>
      <table className="w-full bg-bgSoft rounded-lg">
        <thead>
          <tr>
            <th className="p-2.5">Customer Name</th>
            <th className="p-2.5">Status</th>
            <th className="p-2.5">Date</th>
            <th className="p-2.5">Amount</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map(transaction => (
            <tr key={transaction.transaction_id} className="p-2.5 m-2.5">
              <td className="p-2.5 text-center">{`${transaction.customer_fname} ${transaction.customer_lname}`}</td>
              <td className="p-2.5">
                <span className={`rounded-full p-2 flex justify-center ${getStatusClass(transaction.transaction_status)}`}>
                  {capitalizeFirstLetter(transaction.transaction_status)}
                </span>
              </td>
              <td className="p-2.5 text-center">{transaction.transaction_date}</td>
              <td className="p-2.5 text-center">${transaction.transaction_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
