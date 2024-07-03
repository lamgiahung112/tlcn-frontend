import useCarouselControl from "./useCarouselControl.ts";
import IconChevronLeft from "@/components/common/icons/IconChevronLeft.tsx";
import IconChevronRight from "@/components/common/icons/IconChevronRight.tsx";

interface CarouselProps {
    images: Array<string>;
    durationUntilNext: number;
    className?: string;
}

function Carousel(props: CarouselProps) {
    const {
        currentSlide,
        nextSlide,
        prevSlide,
    } = useCarouselControl(props.images.length, props.durationUntilNext)
    return <div className="w-full relative">
        <div className="flex items-center justify-center">
            {props.images.map((image, i) => {
                return <img key={image} src={image} hidden={i !== currentSlide} alt="banner" className="w-[90%] transition"/>
            })}
        </div>
        <button className="absolute left-0 top-1/2 ml-4 p-2 bg-neutral-400 rounded-full bg-opacity-30 group hover:bg-opacity-75"
                onClick={prevSlide}>
            <IconChevronLeft className="size-8 opacity-30 group-hover:opacity-75"/>
        </button>
        <button className="absolute right-0 top-1/2 mr-4 p-2 bg-neutral-400 rounded-full bg-opacity-30 group hover:bg-opacity-75"
                onClick={nextSlide}>
            <IconChevronRight className="size-8 opacity-30 group-hover:opacity-75"/>
        </button>
    </div>
}

export default Carousel;