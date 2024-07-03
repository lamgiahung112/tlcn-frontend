import {useEffect, useState} from "react";

function useCarouselControl(total: number, durationEach: number) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        if (currentSlide + 1 >= total) {
            setCurrentSlide(0);
            return
        }
        setCurrentSlide(currentSlide + 1);
    }

    const prevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(total - 1);
            return
        }
        setCurrentSlide(currentSlide - 1);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide()
        }, durationEach)
        return () => clearInterval(timer)
    }, [currentSlide]);

    return {nextSlide, prevSlide, currentSlide};
}

export default useCarouselControl;