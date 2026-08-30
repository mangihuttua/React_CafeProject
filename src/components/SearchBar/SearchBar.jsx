import { FaSearch } from "react-icons/fa";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative max-w-md mx-auto mb-8">
      <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
      <input type="text" value={value}
             onChange={onChange}
             placeholder={placeholder}
             className="w-full
                        ps-12
                        py-3
                        rounded-xl
                        bg-white
                        focus:outline-none
                        focus:ring-2
                        focus:ring-orange-500
                        shadow-sm "/>
    </div>
  );
}

export default SearchBar;