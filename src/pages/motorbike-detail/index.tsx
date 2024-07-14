import DirectorySlugDisplay from "../../components/common/directory-slug-display";
import IntroductionMediaDisplay from "./components/introduction-media-display";
import Explore from "./components/Explore";
import Design from "./components/Design";

function MotorbikeDetailPage() {
    return <div>
        <DirectorySlugDisplay slugs={[{title: "XE", href: "/xe"}]}/>
        <div className="flex flex-col gap-y-32">
            <IntroductionMediaDisplay/>
            <Explore/>
            <Design/>
        </div>
    </div>
}

export default MotorbikeDetailPage;