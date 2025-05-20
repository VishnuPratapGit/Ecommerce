import { Search } from "lucide-react";

const SearchSeller = () => {
  return (
    <div className="flex border border-neutral-700 rounded-xl">
      <div className="flex items-center px-3 pointer-events-none">
        <Search className="text-neutral-500" />
      </div>
      <input
        type="text"
        className="w-2xl py-4 pr-3 text-sm outline-none"
        placeholder="search..."
      />
    </div>
  );
};

export default SearchSeller;
