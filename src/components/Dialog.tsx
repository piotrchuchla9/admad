import { ReactNode } from "react";
import { IconX } from '@tabler/icons-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export default function Dialog({ isOpen, onClose, children, title }: DialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-1/2 md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-center w-full">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <IconX />
          </button>
        </div>
        <div className="mb-4">{children}</div>
      </div>
    </div>
  );
};
