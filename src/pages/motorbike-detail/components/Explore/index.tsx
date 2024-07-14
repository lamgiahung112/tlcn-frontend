import use360Image from "../../../../hooks/UI/use360Image.tsx";
import {Link} from "react-router-dom";

function Explore() {
    const images = [
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/004-1-1024x860.png",
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/005-1-1024x860.png",
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/006-1-1024x860.png",
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/007-1-1024x860.png",
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/008-1-1024x860.png",
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/001-1-1024x860.png",
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/002-1-1024x860.png",
        "https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/003-1-1024x860.png"
    ]
    const {onMouseDown, currentImageIndex} = use360Image(images)

    return <div className="flex flex-col gap-y-8 px-[10vw]">
        <div className="text-2xl font-semibold">KHÁM PHÁ</div>
        <div className="flex justify-center gap-x-8">
            <div onMouseDown={onMouseDown} className="w-[60%] bg-neutral-300 cursor-move select-none p-10">
                <img className="pointer-events-none" src={images[currentImageIndex]} alt="" />
            </div>
            <div className="flex-[1] flex flex-col gap-y-4">
                <div className="w-full h-[1px] bg-black"></div>
                <div className="text-2xl font-semibold">
                    LEXI 155 VVA-ABS PHIÊN BẢN TIÊU CHUẨN
                </div>
                <div>
                    Giá bán lẻ đề xuất <span className="font-semibold">48.500.000 VNĐ</span>
                </div>
                <div>
                    MÀU SẮC: XÁM NHÁM
                </div>
                <div>
                    color picker
                </div>
                <div>
                    Xuất phát từ khái niệm "kết hợp phong cách thể thao và sự tinh tế thời thượng", LEXI 2024 hoàn toàn mới mang lại sức hấp dẫn khó cưỡng với kiểu dáng hiện đại và sang trọng, khả năng kết nối điện thoại thông minh tiện lợi, sức mạnh khối động cơ 155cc cho công suất và hiệu suất vượt trội so với những khối động cơ cùng dung tích.
                </div>
                <Link to="/sosanh" className="bg-black text-white text-center py-4 px-16 rounded-lg">
                    So sanh xe
                </Link>
            </div>
        </div>
    </div>;
}

export default Explore;