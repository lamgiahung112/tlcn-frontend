import Carousel from "../../../../components/common/carousel";

function Gallery() {
    return <div className="flex flex-col gap-y-8 px-[10vw]">
        <div className="text-2xl font-semibold">THƯ VIỆN HÌNH ẢNH</div>
        <Carousel images={[
            "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/PZ9_6366.jpg",
            "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/MAP_1097.jpg",
            "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/MAP_1400.jpg",
            "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/MAP_1164.jpg",
        ]} durationUntilNext={3000} />
    </div>
}

export default Gallery;