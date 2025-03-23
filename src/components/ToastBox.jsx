import React from 'react';
import { X } from 'lucide-react';

const ToastBox = ({ message, closeToast }) => {
  return (
    <div className="bg-transparent m-0 w-[90vw] sm:w-[300px] md:w-[400px]">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="ml-2 sm:ml-3 flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-900">
            {message}
          </p>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500">
            Please login to access this feature
          </p>
        </div>
        <div className="ml-2 sm:ml-4 flex-shrink-0 flex">
          <button
            onClick={closeToast}
            className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none p-1"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
      <div className="mt-2 sm:mt-3">
        <div className="h-0.5 sm:h-1 bg-green-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-600 animate-progress" />
        </div>
      </div>
    </div>
  );
};

export default ToastBox;
