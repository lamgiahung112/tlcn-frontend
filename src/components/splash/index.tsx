import logo from '@/assets/images/logo.png'
import Loading from "@/components/common/loading";

function Splash() {
    return <div className="w-screen h-screen flex flex-col justify-center items-center bg-pink-200">
        <img className="w-[50%]" src={logo} alt="logo" fetchpriority="high" decoding="async"/>
        <Loading className="border-t-red-500 h-[90px] w-[90px] border-8"/>
    </div>
}


export default Splash;
