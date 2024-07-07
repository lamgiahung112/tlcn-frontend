import {VehicleExplorerItem} from "./index.tsx";
import IconArrowRight from "../../../common/icons/IconArrowRight.tsx";
import {Link} from "react-router-dom";
import {twMerge} from "tailwind-merge";

interface VehicleList {
    title: string;
    items: VehicleExplorerItem[];
    currentItem: VehicleExplorerItem;
    onItemClick: (item: VehicleExplorerItem) => void;
}

function VehicleList(props: VehicleList) {
    return <div className="absolute w-full z-20 flex justify-center">
        <div className="flex items-center justify-end  text-3xl font-semibold gap-x-4 p-4 bg-white w-[40%] h-[120px]">
            {props.title}
            <IconArrowRight className="size-10" />
        </div>
        <div className="flex items-center justify-start flex-[1] p-4 h-[200px] bg-white rounded-bl-xl">{
            props.items.map((item) => (
                <div className="flex flex-col items-center justify-center group cursor-pointer" key={item.name} onClick={() => props.onItemClick(item)}>
                    <img alt={item.name} src={item.image} className="h-[50%] w-[50%]" />
                    <Link to={item.goToDetailLink} className={twMerge(
                        "group-hover:text-blue-400 group-hover:underline",
                        props.currentItem === item ? "text-blue-400 underline" : "",
                    )}>{item.name}</Link>
                </div>
            ))
        }</div>
    </div>
}

export default VehicleList;