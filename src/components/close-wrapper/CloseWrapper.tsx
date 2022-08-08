import React from 'react';

type CloseWrapperProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const CloseWrapper = ({
  children: componentToBeWrapped,
  onClose,
}: CloseWrapperProps) => {
  return (
    <div className="relative">
      {componentToBeWrapped}
      <button
        className="absolute right-1 top-1 w-5 h-5 text-center leading-5 text-slate-700 bg-slate-300 hover:bg-slate-400 opacity-75 rounded-full"
        onClick={onClose}
      >
        x
      </button>
    </div>
  );
};

export default CloseWrapper;
