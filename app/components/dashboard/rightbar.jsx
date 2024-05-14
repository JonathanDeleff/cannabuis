import Image from "next/image";
import { MdPlayCircleFilled } from "react-icons/md";

const Rightbar = () => {
    return (
        <div className="fixed">
            <div className="relative bg-gradient-to-t from-bgSoft p-5 rounded-lg mb-5">
                <div className="absolute bottom-0 right-0 h-1/2 w-1/2">
                    <Image className="object-contain opacity-20" src="/cannabis1.jpg" alt="" fill/>
                </div>
                <div className="flex flex-col gap-6">
                    <span className="font-bold">🔥 Available Now</span>
                    <h3 className="font-medium">New strains now in stock!!!</h3>
                    <span className="font-medium text-xs text-textSoft">Learn all about new strains in stock now</span>
                    <p className="font-medium text-xs text-textSoft">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                       Reprehenderit eius libero perspiciatis recusandae possimus.
                    </p>
                    <button className="p-2.5 flex items-center gap-2.5 bg-purple-700 text-white border-none rounded-lg cursor-pointer w-max">
                        <MdPlayCircleFilled />
                        watch
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Rightbar;