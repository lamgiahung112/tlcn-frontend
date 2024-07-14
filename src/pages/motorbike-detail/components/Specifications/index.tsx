import CollapsibleTable from "./CollapsibleTable.tsx";

function Specifications() {
    return <div className="flex flex-col gap-y-8 px-[10vw]">
        <div className="text-2xl font-semibold">THÔNG SỐ KỸ THUẬT</div>
        <div className="flex flex-col">
            <CollapsibleTable
                title="ĐỘNG CƠ"
                specs={{
                    "LOẠI": "Động cơ xăng, 4 kỳ, 1 xi lanh, làm mát bằng chất lỏng",
                    "BỐ TRÍ XI LANH": "Xi lanh đơn"
                }}
            />
            <CollapsibleTable
                title="ĐỘNG CƠ"
                specs={{
                    "LOẠI": "Động cơ xăng, 4 kỳ, 1 xi lanh, làm mát bằng chất lỏng",
                    "BỐ TRÍ XI LANH": "Xi lanh đơn"
                }}
            />
            <CollapsibleTable
                title="ĐỘNG CƠ"
                specs={{
                    "LOẠI": "Động cơ xăng, 4 kỳ, 1 xi lanh, làm mát bằng chất lỏng",
                    "BỐ TRÍ XI LANH": "Xi lanh đơn"
                }}
            />
            <CollapsibleTable
                title="ĐỘNG CƠ"
                specs={{
                    "LOẠI": "Động cơ xăng, 4 kỳ, 1 xi lanh, làm mát bằng chất lỏng",
                    "BỐ TRÍ XI LANH": "Xi lanh đơn"
                }}
            />
        </div>
    </div>;
}

export default Specifications;