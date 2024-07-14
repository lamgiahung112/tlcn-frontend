import {VehicleExplorerItem} from "./index.tsx";

interface VehicleDisplayProps {
    item: VehicleExplorerItem
}

function VehicleDisplay(props: VehicleDisplayProps) {
    return <div className="absolute z-20 bottom-[15vh] left-[10vw] w-[33vw] h-[33vh]">
        <img src={props.item.image} alt={props.item.name} />
    </div>
}

export default VehicleDisplay;