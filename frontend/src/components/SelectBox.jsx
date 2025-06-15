// components/SelectBox.jsx
import React from "react";

const SelectBox = ({ id, options, placeholder }) => {
  return (
    <select
      id={id}
      defaultValue=""
      className="block w-50 p-2 border-gray-400 bg-white rounded-lg shadow-sm border-1 focus:outline-none focus:ring-1 focus:ring-gray-200 hover:bg-yellow-50 text-gray-700"
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
};

export default SelectBox;
