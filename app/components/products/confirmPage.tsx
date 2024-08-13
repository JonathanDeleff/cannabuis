import React from 'react';

interface ConfirmProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="flex flex-col items-center">
            <button className="mt-1 p-2.5 bg-red-500 text-white rounded-lg" onClick={onCancel}>
                Cancel Sale
            </button>
            <button className="mt-1 p-2.5 bg-green-500 text-white rounded-lg" onClick={onConfirm}>
                Confirm Sale
            </button>
        </div>
    );
}

export default Confirm;
