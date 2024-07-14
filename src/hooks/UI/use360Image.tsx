import {MouseEventHandler, useEffect, useState} from "react";

function use360Image(images: string[]) {
    const [isDragging, setDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (isDragging) {
                const movementX = event.clientX - startX;
                const screenWidth = window.innerWidth;
                const imageSwitchThreshold = screenWidth / images.length;


                if (Math.abs(movementX) >= imageSwitchThreshold) {
                    const newIndex = (currentImageIndex + -Math.sign(movementX)) % images.length;
                    setCurrentImageIndex(newIndex >= 0 ? newIndex : images.length - 1);
                    setStartX(event.clientX); // Reset startX to avoid fast switching
                }
            }
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        } else {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, startX, images.length, currentImageIndex]);

    const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        setDragging(true);
        setStartX(event.clientX);
    };

    return {currentImageIndex ,onMouseDown};
}

export default use360Image;