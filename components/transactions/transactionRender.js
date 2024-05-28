// TODO: add styling for status boxes
const Transaction = ( {transactions} ) => {
    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="p-2.5">Customer ID</td>
                        <td className="p-2.5">Status</td>
                        <td className="p-2.5">Date</td>
                        <td className="p-2.5">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions?.map(transaction => (
                        <tr key={transaction.transaction_id}>
                            <td className="p-2.5">{transaction.customer_id}</td>
                            <td className="p-2.5">{transaction.transaction_status}</td>
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