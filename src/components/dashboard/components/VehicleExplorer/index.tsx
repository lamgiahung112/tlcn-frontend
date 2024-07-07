import vehicleDisplayBg from "@/assets/images/vehicle_display_bg.png";
import VehicleList from "./VehicleList.tsx";
import {useState} from "react";
import VehicleDisplay from "./VehicleDisplay.tsx";
import VehicleMoreInfo from "./VehicleMoreInfo.tsx";

export interface VehicleExplorerItem {
  name: string;
  image: string;
  price: string;
  goToDetailLink: string;
}

interface VehicleExplorerProps {
  title: string;
  items: VehicleExplorerItem[];
}

function VehicleExplorer(props: VehicleExplorerProps) {
  const [currentItem, setCurrentItem] = useState(props.items[0]);

  function onVehicleClick(item: VehicleExplorerItem) {
    setCurrentItem(item)
  }

  return (
    <div className="relative w-full flex h-full">
      <img src={vehicleDisplayBg} alt="bg" className="z-10"/>
      <VehicleList {...props} currentItem={currentItem} onItemClick={onVehicleClick} />
      <VehicleDisplay item={currentItem} />
      <VehicleMoreInfo item={currentItem} />
    </div>
  );
}

export default VehicleExplorer;
