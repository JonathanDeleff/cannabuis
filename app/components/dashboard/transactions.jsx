import Image from 'next/image';

const Transactions = () => {
    return (
        <div className="bg-bgSoft p-5 rounded-lg">
        <h2 className="mb-5 font-extralight text-textSoft">Latest Transactions</h2>
        {/** table to be implemented with backend 
         * will use an auto generated table more similar to how the sidebar is generated
         * this is a placeholder
        */}
        <table className="w-full">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Status</td>
                    <td>Date</td>
                    <td>Amount</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='p-2.5'>
                        <div className='flex gap-2.5 items-center'>
                            {/** image source to be changed when available */}
                            <Image src="/noavatar.png" alt="" width={40} height={40} className="object-cover rounded-full"/>
                            John Doe
                        </div>
                    </td>
                    <td className='p-2.5'>
                        <span className="rounded p-1.5 text-sm text-white bg-pending">pending</span>
                    </td>
                    <td className='p-2.5'>14.02.2024</td>
                    <td className='p-2.5'>$3,200</td>
                </tr>
                <tr>
                    <td className='p-2.5'>
                        <div className='flex gap-2.5 items-center'>
                            {/** image source to be changed when available */}
                            <Image src="/noavatar.png" alt="" width={40} height={40} className="userImage"/>
                            Joe Schmoe
                        </div>
                    </td>
                    <td className='p-2.5'>
                        <span className="rounded p-1.5 text-sm text-white bg-complete">Complete</span>
                    </td>
                    <td className='p-2.5'>14.02.2024</td>
                    <td className='p-2.5'>$200</td>
                </tr>
                <tr>
                    <td className='p-2.5'>
                        <div className='flex gap-2.5 items-center'>
                            {/** image source to be changed when available */}
                            <Image src="/noavatar.png" alt="" width={40} height={40} className="userImage"/>
                            Roger Dodger
                        </div>
                    </td>
                    <td className='p-2.5'>
                        <span className="rounded p-1.5 text-sm text-white bg-cancelled">Cancelled</span>
                    </td>
                    <td className='p-2.5'>14.02.2024</td>
                    <td className='p-2.5'>$60</td>
                </tr>
            </tbody>
        </table>
        </div>
    );
}

export default Transactions;