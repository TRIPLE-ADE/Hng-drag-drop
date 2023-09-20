import React, { useState } from 'react';

const SearchInput = ({ onSearch, searchTerm, setSearchTerm }) => {

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 text-center">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
        className="px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-1 ml-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
