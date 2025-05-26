import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ search, setSearch }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/search")}
      className="flex border border-neutral-700 rounded-xl w-full max-w-2xl"
    >
      <div className="flex items-center px-3 pointer-events-none">
        <Search className="text-neutral-500" />
      </div>
      <input
        type="text"
        className="w-full py-4 pr-3 text-sm outline-none"
        placeholder="search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
