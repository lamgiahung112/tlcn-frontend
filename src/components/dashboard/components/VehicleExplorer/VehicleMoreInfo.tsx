import {VehicleExplorerItem} from "./index.tsx";
import {Link} from "react-router-dom";

interface VehicleMoreInfoProps {
    item: VehicleExplorerItem
}

function VehicleMoreInfo(props: VehicleMoreInfoProps) {
    return <div className="absolute bottom-0 right-0 z-20 w-[40%] bg-white p-[60px] h-[240px] rounded-tl-xl">
        <div className="flex flex-col text-3xl gap-y-2 justify-center font-medium items-center w-[50%]">
            <div className="flex flex-col items-center">{props.item.name}</div>
            <div>Giá từ {props.item.price}</div>
            <Link to={props.item.goToDetailLink} className="bg-black text-white py-4 px-16 rounded-lg">
                Xem chi tiết
            </Link>
        </div>
    </div>
}

export default VehicleMoreInfo;