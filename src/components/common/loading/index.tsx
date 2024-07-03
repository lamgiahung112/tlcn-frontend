import {twMerge} from "tailwind-merge";

interface LoadingProps {
    className?: string;
}

function Loading(props: LoadingProps){
    return <div className={twMerge(
        "rounded-full border-4 border-transparent border-t-amber-300 w-10 h-10 animate-spin-cubic",
        props.className,
    )}></div>
}

export default Loading