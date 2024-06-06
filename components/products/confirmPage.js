const Confirm = ({ onConfirm, onCancel }) => {
    return (
        <div className="flex flex-col items-center">
            <button className="mt-1 p-2.5 bg-green-500 text-white rounded-lg" onClick={() => onCancel()} >
                Cancel Sell
            </button>
            <button className="mt-1 p-2.5 bg-red-500 text-white rounded-lg" onClick={() => onConfirm()} >
                Confirm Sell
            </button>
        </div>
    );
}
  
export default Confirm;
