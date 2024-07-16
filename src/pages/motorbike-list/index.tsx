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
                    <div className="flex flex-col w-full md:w-[40%] lg:w-[30%] bg-neutral-200 p-8">
                        <div className="text-xl font-semibold">LEXI</div>
                        <div className="">LEXI</div>
                    </div>
                    <div className="flex w-full md:w-[40%] lg:w-[30%]">
                    ss
                    </div>
                    <div className="flex w-full md:w-[40%] lg:w-[30%]">
                        ss
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default MotorbikeListPage;