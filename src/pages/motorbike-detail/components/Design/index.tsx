import FeatureDisplay from "../FeatureDisplay";

function Design() {
    return <div className="flex flex-col gap-y-8 pl-[10vw]">
        <div className="text-2xl font-semibold">THIẾT KẾ ĐẶC TRƯNG</div>
        <div className="relative">
            <img
                src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/01/prod_d_img01.jpg"
                alt=""
            />
            <span className="absolute top-0 left-0 z-[10] text-white text-opacity-25 text-9xl font-bold">LEXI</span>
            <img
                className="absolute top-[10%] right-0 w-[50%]"
                src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/Lexi-155_Mat-Black-5.png"
                alt=""
            />
            <div className="p-8 max-w-[50%] font-medium text-xl">Thiết kế ấn tượng khi kết hợp giữa phong cách thể thao và sự tinh tế thời thượng</div>
        </div>
        <div className="flex gap-x-4 flex-wrap">
            <FeatureDisplay/>
            <FeatureDisplay/>
            <FeatureDisplay/>
            <FeatureDisplay/>
            <FeatureDisplay/>
            <FeatureDisplay/>
        </div>
    </div>;
}

export default Design;