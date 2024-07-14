import {ReactNode} from "react";

interface SectionProps {
    title?: string;
    children?: ReactNode;
}

function Section(props: SectionProps) {
    return <div className="w-full flex flex-col items-center justify-center">
        {props.title && <div className="text-3xl font-semibold mb-8">{props.title}</div>}
        {props.children}
    </div>
}

export default Section;