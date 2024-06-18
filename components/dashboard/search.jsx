import { MdSearch } from "react-icons/md";

export default function Search({placeholder, setSearchQuery}) {
  return (
    <div className="border-solid border-border border-2 flex items-center gap-2 bg-search rounded-lg p-1">
      <MdSearch className='flex gap-2 text-black'/>
      <input type="text" placeholder={placeholder} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none text-black p-1"/>
    </div>
  );
}
