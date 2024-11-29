import SpecDrawer from "@/components/customer/specs_drawer"
import use360Image from "@/hooks/UI/use360Image"
import useCart from "@/hooks/zustand/useCart"
import useGenericMotorbike from "@/hooks/zustand/useGenericMotorbike"
import { _currency } from "@/utils/format"
import { _imgLink } from "@/utils/img-link"
import { memo, useEffect, useMemo, useState } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick"

function MotorbikeDetailPage() {
	const { updateCart, removeFromCart, cart } = useCart()
	const { currentGenericMotorbike, fetchGenericMotorbike } = useGenericMotorbike()
	const { currentImageIndex, onMouseDown } = use360Image(
		currentGenericMotorbike?.images?.filter((image) => !image.isGallery).length ?? 0
	)
	const { id } = useParams()
	const [openDrawer, setOpenDrawer] = useState<
		"engine" | "chassis" | "warranty" | null
	>("engine")

	const isInCart = useMemo(() => {
		return cart.some(
			(item) => item.genericMotorbikeId === currentGenericMotorbike?.id
		)
	}, [cart, currentGenericMotorbike?.id])

	const toggleDrawer = (drawer: "engine" | "chassis" | "warranty") => {
		setOpenDrawer(openDrawer === drawer ? null : drawer)
	}

	useEffect(() => {
		if (id) {
			fetchGenericMotorbike(Number(id))
		}
	}, [id])

	return (
		<div className="flex flex-col w-full gap-y-8">
			<Link to="/motorbikes" className="flex items-center gap-2">
				<FaChevronLeft />
				<span>Back to List</span>
			</Link>
			<div className="flex flex-col gap-y-4 p-8">
				<div className="flex gap-x-4">
					<div className="w-1/2" draggable={false} onMouseDown={onMouseDown}>
						<img
							className="cursor-grab"
							src={_imgLink(
								currentGenericMotorbike?.images[currentImageIndex]
									?.imageResource.s3Key ?? ""
							)}
							alt={currentGenericMotorbike?.name}
						/>
					</div>
					<div className="w-1/2 flex flex-col gap-y-4">
						<h1 className="text-3xl font-bold">
							{currentGenericMotorbike?.name}
						</h1>

						<div className="flex items-center justify-between">
							<div className="text-2xl text-green-600 font-semibold">
								{_currency(
									currentGenericMotorbike?.recommendedPrice ?? 0
								)}
							</div>

							{isInCart ? (
								<button
									className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2"
									onClick={() =>
										currentGenericMotorbike &&
										removeFromCart(currentGenericMotorbike.id)
									}
								>
									<span>Added to Cart</span>
									<span className="text-sm">(Click to Remove)</span>
								</button>
							) : (
								<button
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
									onClick={() =>
										currentGenericMotorbike &&
										updateCart(currentGenericMotorbike.id, 1)
									}
								>
									Add to Cart
								</button>
							)}
						</div>

						<div className="flex items-center gap-x-2">
							<div
								className="w-6 h-6 rounded-full border border-gray-200"
								style={{
									backgroundColor: currentGenericMotorbike?.colorInHex,
								}}
							/>
							<span className="text-gray-600">
								{currentGenericMotorbike?.colorName}
							</span>
						</div>

						<div className="text-gray-700">
							<h2 className="text-xl font-semibold mb-2">Description</h2>
							<p className="whitespace-pre-wrap">
								{currentGenericMotorbike?.description}
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="px-8 flex flex-col gap-y-2">
				<SpecDrawer
					title="Engine Specifications"
					specs={currentGenericMotorbike?.engineSpecs}
					isOpen={openDrawer === "engine"}
					onToggle={() => toggleDrawer("engine")}
				/>
				<SpecDrawer
					title="Chassis Specifications"
					specs={currentGenericMotorbike?.chassisSpecs}
					isOpen={openDrawer === "chassis"}
					onToggle={() => toggleDrawer("chassis")}
				/>
				<SpecDrawer
					title="Warranty Information"
					specs={currentGenericMotorbike?.warrantySpecs}
					isOpen={openDrawer === "warranty"}
					onToggle={() => toggleDrawer("warranty")}
				/>
			</div>
			<div className="px-8 flex flex-col gap-y-2">
				<h2 className="text-xl font-semibold mb-4">Gallery</h2>
				<Slider
					dots={true}
					infinite={false}
					speed={500}
					slidesToShow={3}
					slidesToScroll={1}
					responsive={[
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
							},
						},
						{
							breakpoint: 640,
							settings: {
								slidesToShow: 1,
							},
						},
					]}
				>
					{currentGenericMotorbike?.images
						?.filter((image) => image.isGallery)
						.map((image) => (
							<div key={image.id} className="px-2">
								<div className="aspect-square w-[75%] overflow-hidden rounded-lg">
									<img
										src={_imgLink(image.imageResource.s3Key)}
										alt={`${currentGenericMotorbike.name} gallery`}
										className="h-full w-full object-cover hover:scale-105 transition-transform cursor-pointer"
									/>
								</div>
							</div>
						))}
				</Slider>
			</div>
		</div>
	)
}

export default memo(MotorbikeDetailPage)
