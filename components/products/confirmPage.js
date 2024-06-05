const Confirm = ({ onConfirm, onCancel }) => {
    return (
        <div>
            <button className="p-2.5 bg-green-500 text-white rounded-lg" onClick={() => onCancel()} >
                Cancel Sell
            </button>
            <button className="p-2.5 bg-red-500 text-white rounded-lg" onClick={() => onConfirm()} >
                Confirm Sell
            </button>
        </div>
    );
}
  
export default Confirm;
