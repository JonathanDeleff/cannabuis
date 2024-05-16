// variables to hold button state, will modify with logic
const nextDisabled = false;
const prevDisabled = true;

// page navigation for rendered items still needs logic
const Pagination = () => {
    return (
        <div className="p-2.5 flex justify-between ">
            <button className={`px-2.5 py-1 cursor-pointer text-black ${prevDisabled ? 'cursor-not-allowed bg-slate-500' : 'bg-button'}`}>Previous</button>
            <button className={`px-2.5 py-1 cursor-pointer text-black ${nextDisabled ? 'cursor-not-allowed bg-slate-500' : 'bg-button'}`}>Next</button>
        </div>
    );
}

export default Pagination;