import { MdSupervisedUserCircle } from "react-icons/md";

const Card = () => {
    // placeholder logic for number coloring
    const isPositive = true;
    
    return (
        <div className="bg-bgSoft p-5 rounded-lg flex gap-5 cursor-pointer w-full hover:bg-hover">
        <MdSupervisedUserCircle size={24}/>
        <div className="flex flex-col gap-5">
            <span className="title">Total users</span>
            {/*  placeholder numbers for backend analytics*/}
            <span className="text-2xl font-medium">10.273</span>
            <span className="text-sm font-light">
                {/* placeholder for a backend implementation */}
                <span className={`${isPositive ? 'text-lime-500' : 'text-red-500'}`}>12% </span>
                more than previous week
                </span>
        </div>
        </div>
    );
}

    export default Card;