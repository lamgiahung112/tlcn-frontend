import { FaChevronLeft } from "react-icons/fa";

interface DrawerProps {
    title: string;
    specs: Record<string, any> | undefined;
    isOpen: boolean;
    onToggle: () => void;
}

const SpecDrawer = ({ title, specs, isOpen, onToggle }: DrawerProps) => {
    return (
        <div className="border rounded-lg">
        <button 
            className="w-full p-4 flex justify-between items-center text-left"
            onClick={onToggle}
        >
            <span className="font-semibold">{title}</span>
            <FaChevronLeft className={`transform transition-transform ${isOpen ? 'rotate-90' : '-rotate-90'}`} />
        </button>
        
        {isOpen && specs && (
            <div className="p-4 border-t bg-gray-50">
            {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium">{value}</span>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default SpecDrawer