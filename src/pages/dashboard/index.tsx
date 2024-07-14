import Carousel from "../../components/common/carousel";
import banner_2 from '@/assets/images/banner_2.png'
import banner_3 from '@/assets/images/banner_3.png'
import lexiPng from '@/assets/images/lexi.png'
import grandePng from '@/assets/images/grande.png'
import freegoPng from '@/assets/images/freego.png'
import lattePng from '@/assets/images/latte.png'
import nvxPng from '@/assets/images/nvx.png'
import janusPng from '@/assets/images/janus.png'
import Section from "./components/Section";
import VehicleExplorer from "./components/VehicleExplorer";
import type { VehicleExplorerItem } from './components/VehicleExplorer';
import SectionSpacer from "./components/Section/SectionSpacer.tsx";

function Dashboard() {
  const tayGaItems: VehicleExplorerItem[] = [
    {
      name: "LEXI",
      goToDetailLink: "/xe/LEXI",
      image: lexiPng,
      price: "54.500.000 VND"
    },
    {
      name: "GRANDE",
      goToDetailLink: "/xe/GRANDE",
      image: grandePng,
      price: "46.047.000 VND"
    },
    {
      name: "FREEGO",
      goToDetailLink: "/xe/FREEGO",
      image: freegoPng,
      price: "30.142.000 VND"
    },
    {
      name: "LATTE",
      goToDetailLink: "/xe/LATTE",
      image: lattePng,
      price: "38.095.000 VND"
    },
    {
      name: "JANUS",
      goToDetailLink: "/xe/JANUS",
      image: janusPng,
      price: "28.571.000 VND"
    },
    {
      name: "NVX",
      goToDetailLink: "/xe/NVX",
      image: nvxPng,
      price: "54.500.000 VND"
    },
  ]
  return <div className="flex flex-col w-full gap-y-32">
    <Carousel
      images={[
        banner_2,
        banner_3,
      ]}
      durationUntilNext={5000} />
    <Section title="KHÁM PHÁ SẢN PHẨM">
      <VehicleExplorer
        title="XE TAY GA"
        items={tayGaItems}
      />
    </Section>
    <SectionSpacer/>
    <Section>
      <VehicleExplorer
          title="XE TAY GA"
          items={tayGaItems}
      />
    </Section>
  </div>
}

export default Dashboard;
