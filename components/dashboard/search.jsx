import { MdSearch } from "react-icons/md";

const Search = ({placeholder}) => {
  return (
    <div className="border-solid border-border border-2 flex items-center gap-2 bg-search rounded-lg p-1">
      <MdSearch className='flex gap-2 text-black'/>
      <input type="text" placeholder={placeholder} className="bg-transparent border-none text-black p-1"/>
    </div>
  );
}

export default Search;