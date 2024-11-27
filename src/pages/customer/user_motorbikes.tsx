import { Link, useParams } from "react-router-dom"
import useUser from "@/hooks/zustand/useUser"
import { useEffect } from "react"
import use360Image from "@/hooks/UI/use360Image"
import { FaChevronLeft } from "react-icons/fa"
import { _imgLink } from "@/utils/img-link"
function UserMotorbikePage() {
	const { id } = useParams()
	const { motorbike, getMotorbikeDetail } = useUser()
	const { currentImageIndex, onMouseDown } = use360Image(
		motorbike?.genericMotorbike.images?.length ?? 0
	)

	useEffect(() => {
		getMotorbikeDetail(Number(id))
	}, [id])

	return (
		<div className="flex flex-col w-full gap-y-8">
			<Link to="/user" className="flex items-center gap-2">
				<FaChevronLeft />
				<span>Back to List</span>
			</Link>
			<div className="flex flex-col gap-y-4 p-8">
				<div className="flex gap-x-4">
					<div className="w-1/2" draggable={false} onMouseDown={onMouseDown}>
						<img
							src={_imgLink(
								motorbike?.genericMotorbike.images[currentImageIndex]
									?.imageResource?.s3Key ?? ""
							)}
							alt={motorbike?.genericMotorbike.name}
						/>
					</div>  
					<div className="w-1/2 flex flex-col gap-y-4">
						<h1 className="text-3xl font-bold">
							{motorbike?.genericMotorbike.name}
						</h1>

						<div className="text-gray-700">
							<div className="space-y-3">
								<div className="flex items-center gap-x-2">
									<span className="font-medium">Color: </span>
									<div
										className="w-6 h-6 rounded-full border border-gray-200"
										style={{
											backgroundColor:
												motorbike?.genericMotorbike.colorInHex,
										}}
									/>
									<span className="text-gray-600">
										{motorbike?.genericMotorbike.colorName}
									</span>
								</div>
								<div>
									<span className="font-medium">Engine Code: </span>
									<span>{motorbike?.engineCode || "N/A"}</span>
								</div>
								<div>
									<span className="font-medium">Chassis Code: </span>
									<span>{motorbike?.chassisCode || "N/A"}</span>
								</div>
								<div>
									<span className="font-medium">Plate Number: </span>
									<span>{motorbike?.plateNumber || "N/A"}</span>
								</div>
								<div>
									<span className="font-medium">Total Odometer: </span>
									<span>{motorbike?.odometer || "N/A"}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-8">
					<h2 className="text-xl font-semibold mb-4">Phiếu bảo hành</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{motorbike?.serviceTokens?.map((token) => (
							<div
								key={token.id}
								className={`p-4 rounded-lg border ${
									token.isEligible
										? "border-green-200 bg-green-50"
										: "border-gray-200 bg-gray-50"
								}`}
							>
								<div className="flex justify-between items-start mb-2">
									<div className="font-medium">
										{token.maxOdometer.toLocaleString()}km
									</div>
									<div
										className={`text-sm px-2 py-1 rounded ${
											token.isEligible
												? "bg-green-100 text-green-800"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{token.isEligible ? "Available" : "Unavailable"}
									</div>
								</div>
								<div className="text-sm text-gray-600">
									Tháng: {token.minMonth}-{token.maxMonth}
								</div>
								{token.usedAt && (
									<div className="text-sm text-gray-500 mt-2">
										Used on:{" "}
										{new Date(token.usedAt).toLocaleDateString()}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserMotorbikePage
