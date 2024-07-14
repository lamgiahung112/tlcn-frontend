import ReactPlayer from "react-player";

function IntroductionMediaDisplay() {
    return <ReactPlayer
        url="https://www.youtube.com/embed/SNYZ5jPpZHA?playsinline=1&autoplay=1&controls=0&hl=vi&loop=1&disablekb=1&playlist=SNYZ5jPpZHA&rel=1&enablejsapi=1&origin=https%3A%2F%2Fyamaha-motor.com.vn&widgetid=1"
        playing
        muted
        controls={false}
        loop
        width="100%"
        height="100vh"
    />
}

export default IntroductionMediaDisplay;