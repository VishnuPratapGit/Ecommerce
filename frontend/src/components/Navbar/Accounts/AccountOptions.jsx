import React from "react";

const AccountOptions = ({ option, ...props }) => {
  return (
    <div
      {...props}
      className="block text-neutral-500 px-4 py-2 w-full text-sm text-left hover:bg-gray-200"
    >
      {option}
    </div>
  );
};

export default AccountOptions;
