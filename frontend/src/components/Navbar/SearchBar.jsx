import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  'Search "milk"',
  'Search "bread"',
  'Search "buiscuit"',
  'Search "chips"',
];

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState(items[0]);

  useEffect(() => {
    let i = 1;

    const interval = setInterval(() => {
      setSearchItem(items[i]);
      i = (i + 1) % items.length;
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex border border-neutral-700 rounded-xl">
      <div className="flex items-center px-3 pointer-events-none">
        <Search className="text-neutral-500" />
      </div>
      <input
        type="text"
        className="w-2xl py-4 pr-3 text-sm outline-none"
        placeholder={searchItem}
      />
    </div>
  );
};

export default SearchBar;
