import {RefObject, useEffect, useState} from "react";

function useVisibleOnScroll(element: RefObject<HTMLElement>) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!element.current) return;
            const triggerPosition = element.current.getBoundingClientRect().y;
            const viewportHeight = window.innerHeight;
            const triggerOffset = 300;
            console.log({triggerPosition, threshold: viewportHeight-triggerOffset});
            if (triggerPosition > 0 && triggerPosition < viewportHeight - triggerOffset) {
                setVisible(true);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [element]);

    return visible
}

export default useVisibleOnScroll;