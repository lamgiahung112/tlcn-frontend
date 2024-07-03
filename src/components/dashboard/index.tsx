import Carousel from "../common/carousel";
import banner_2 from '@/assets/images/banner_2.png'
import banner_3 from '@/assets/images/banner_3.png'
function Dashboard() {

    return <div className="flex flex-col w-screen">
        <Carousel
            images={[
                banner_2,
                banner_3,
            ]}
            durationUntilNext={5000}/>
    </div>
}

export default Dashboard;