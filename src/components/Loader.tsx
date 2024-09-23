import { IconLoader } from '@tabler/icons-react';

interface LoadingDialogProps {
  isOpen: boolean;
}

export default function LoadingDialog({ isOpen }: LoadingDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col items-center p-6">
        <IconLoader className="animate-spin text-blue-500" size={50} />
        <p className="mt-4 font-semibold text-white">Loading...</p>
      </div>
    </div>
  );
};
