import {VehicleExplorerItem} from "./index.tsx";

interface VehicleDisplayProps {
    item: VehicleExplorerItem
}

function VehicleDisplay(props: VehicleDisplayProps) {
    return <div className="absolute z-20 bottom-[-5%] left-[15%] w-[75%] h-[75%]">
        <img src={props.item.image} alt={props.item.name} />
    </div>
}

export default VehicleDisplay;