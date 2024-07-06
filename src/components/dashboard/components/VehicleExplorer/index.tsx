import vehicleDisplayBg from '@/assets/images/vehicle_display_bg.png'

export interface VehicleExplorerItem {
    name: string;
    image: string;
    price: string;
    goToDetailLink: string;
}

interface VehicleExplorerProps {
    title: string
    items: VehicleExplorerItem[]
}

function VehicleExplorer(props: VehicleExplorerProps) {
    return <div className="relative w-full">
        <img src={vehicleDisplayBg} alt="bg" className="absolute z-10" />
        <div className="absolute top-0 z-20">{props.title}</div>
    </div>
}

export default VehicleExplorer;