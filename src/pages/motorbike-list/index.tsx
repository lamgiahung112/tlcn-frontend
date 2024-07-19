import DirectorySlugDisplay from "../../components/common/directory-slug-display";
import PriceSlider from "../../components/PriceSlider";

function MotorbikeListPage() {
    return <div className="w-full flex flex-col gap-y-16">
        <DirectorySlugDisplay slugs={[]}/>
        <div className="pl-[20%]">
            <div className="fixed px-4 w-[15%] max-h-[80vh] space-y-4 left-0 overflow-y-scroll">
                <div className="bg-neutral-300 h-[1px] w-full"></div>
                <div className="flex flex-col justify-evenly gap-y-4">
                    <div className="text-wrap font-medium">Các dòng xe</div>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-between">
                            <div className="flex gap-x-2 items-center">
                                <input
                                    className="h-6 w-6"
                                    type="checkbox"
                                />
                                <div>Xe tay ga</div>
                            </div>
                            <div>(6)</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-x-2 items-center">
                                <input
                                    className="h-6 w-6"
                                    type="checkbox"
                                />
                                <div>Xe số</div>
                            </div>
                            <div>(6)</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="flex gap-x-2 items-center">
                                <input
                                    className="h-6 w-6"
                                    type="checkbox"
                                />
                                <div>Xe điện</div>
                            </div>
                            <div>(6)</div>
                        </div>
                    </div>
                </div>
                <div className="bg-neutral-300 h-[1px] w-full"></div>
                <div className="flex flex-col justify-evenly gap-y-4">
                    <div className="text-wrap font-medium">Giá xe</div>
                    <PriceSlider/>
                </div>
                <div className="bg-neutral-300 h-[1px] w-full"></div>
                <div className="flex flex-col justify-evenly gap-y-4">
                    <div className="text-wrap font-medium">Sắp xếp theo</div>
                </div>
                <div className="bg-neutral-300 h-[1px] w-full"></div>
                <div className="flex flex-col justify-evenly gap-y-4">
                    <div className="text-wrap font-medium">Màu sắc</div>
                </div>
            </div>
            <div className="h-screen w-full flex flex-col gap-y-8">
                <div className="text-4xl font-bold">
                    XE TAY GA
                </div>
                <div className="flex flex-wrap gap-x-8 justify-between">
                    <div className="flex flex-col w-full md:w-[40%] lg:w-[30%] bg-neutral-200 p-8 hover:bg-neutral-100 cursor-pointer">
                        <div className="text-2xl font-semibold">LEXI</div>
                        <div className="flex gap-x-1">Giá từ<span className="font-semibold">48.500.000 VNĐ</span></div>
                        <div className="line-clamp-3 text-neutral-500 text-sm leading-6 w-full text-ellipsis whitespace-normal">
                            Xuất phát từ khái niệm "kết hợp phong cách thể thao và sự tinh tế thời thượng", LEXI 2024 hoàn toàn mới mang lại sức hấp dẫn khó cưỡng với kiểu dáng hiện đại và sang trọng, khả năng kết nối điện thoại thông minh tiện lợi, sức mạnh khối động cơ 155cc cho công suất và hiệu suất vượt trội so với những khối động cơ cùng dung tích.
                        </div>
                        <img
                            alt=""
                            src="https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/06/Lexi-155_Mat-Black-4-768x645.png"
                        />
                        <div className="flex gap-x-4 justify-center items-center">
                            <div className="w-4 h-4 rounded-full bg-amber-300"></div>
                            <div className="w-4 h-4 rounded-full bg-slate-700"></div>
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default MotorbikeListPage;