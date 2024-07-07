import logoExpressive from '@/assets/images/logo_expressive.png'
import HeaderLink from "./components/HeaderLink.tsx";
import {memo, useMemo} from "react";

function Header() {
    const subheaders = useMemo(() => [
        {
            title: "SẢN PHẨM",
            link: "/xe"
        },
        {
            title: "CÔNG NGHỆ",
            link: "/xe"
        },
        {
            title: "DỊCH VỤ",
            link: "/xe"
        },
        {
            title: "KHUYẾN MẠI",
            link: "/xe"
        },
        {
            title: "TUYỂN DỤNG",
            link: "/xe"
        },
        {
            title: "VỀ YAMAHA",
            link: "/xe"
        },
    ], [])
    return <div className="fixed px-4 h-header-height w-full inset-0 flex justify-between z-10 bg-white">
        <img src={logoExpressive} alt="logo" />
        <div className="flex justify-between items-center gap-x-4 md:gap-x-8">
            {subheaders.map(sub => {
                return <HeaderLink key={sub.title} to={sub.link} title={sub.title}/>
            })}
        </div>
    </div>
}

export default memo(Header);