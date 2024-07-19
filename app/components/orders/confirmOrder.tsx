import React from 'react';

type ConfirmProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmOrder: React.FC<ConfirmProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-order">
      <p>Are you sure you want to confirm this order?</p>
      <div className="flex gap-2">
        <button onClick={onConfirm} className="p-2.5 bg-green-500 text-white rounded-lg">
          Confirm
        </button>
        <button onClick={onCancel} className="p-2.5 bg-red-500 text-white rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
