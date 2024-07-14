import {useState} from "react";
import {twMerge} from "tailwind-merge";

interface CollapsibleTableProps {
    title: string;
    specs: Record<string, string>;
}

function CollapsibleTable(props: CollapsibleTableProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return <div className="flex flex-col w-full">
        <div onClick={toggleOpen} className={
            twMerge(
                "flex justify-between border-t-[1px] border-black border-b-[1px] border-t-transparent p-4 font-semibold text-xl cursor-pointer transition",
                isOpen ? "bg-neutral-300 border-t-black"  : "",
            )
        }>
            {props.title}
            <div>{isOpen ? "-" : "+"}</div>
        </div>
        {
            isOpen &&
            Object.keys(props.specs).map((key) => {
                const spec = props.specs[key];
                return <div
                    className="flex justify-between border-t-[1px] border-black border-b-[1px] border-t-transparent p-4 text-lg cursor-pointer animate-scroll-down transition">
                    <div className="w-[40%]">{key}</div>
                    <div className="flex-[1] font-medium">{spec}</div>
                </div>
            })
        }
    </div>
}

export default CollapsibleTable;