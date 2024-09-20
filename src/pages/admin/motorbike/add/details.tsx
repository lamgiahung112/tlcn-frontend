import React, { useState } from "react"
import ResourcePicker from "@/components/admin/resource-picker"
import { Db } from "@/custom"

interface DetailItem {
	title: string
	detail: string
	resource?: Db.Resource
}

interface MotorbikeDetailsProps {
	details: DetailItem[]
	onDetailsChange: (newDetails: DetailItem[]) => void
}

const MotorbikeDetails: React.FC<MotorbikeDetailsProps> = ({
	details,
	onDetailsChange,
}) => {
	const [activeDetailIndex, setActiveDetailIndex] = useState<number | null>(null)

	const addDetail = () => {
		onDetailsChange([...details, { title: "", detail: "", resource: undefined }])
	}

	const removeDetail = (index: number) => {
		onDetailsChange(details.filter((_, i) => i !== index))
	}

	const updateDetail = (index: number, field: keyof DetailItem, value: string) => {
		const updatedDetails = [...details]
		updatedDetails[index] = { ...updatedDetails[index], [field]: value }
		onDetailsChange(updatedDetails)
	}

	const handleResourceSelect = (resource: Db.Resource) => {
		if (activeDetailIndex !== null) {
			const updatedDetails = [...details]
			updatedDetails[activeDetailIndex].resource = resource
			onDetailsChange(updatedDetails)
		}
		setActiveDetailIndex(null)
	}

	const openResourcePicker = (index: number) => {
		setActiveDetailIndex(index)
	}

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Motorbike Details</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{details.map((detail, index) => (
					<div
						key={index}
						className="bg-white shadow-md rounded-lg overflow-hidden"
					>
						<div className="h-48 bg-gray-200 flex items-center justify-center">
							{detail.resource ? (
								<img
									src={detail.resource.url}
									alt={detail.title}
									className="w-full h-full object-cover"
								/>
							) : (
								<span className="text-gray-400">No image</span>
							)}
						</div>
						<div className="p-4">
							<input
								type="text"
								value={detail.title}
								onChange={(e) =>
									updateDetail(index, "title", e.target.value)
								}
								placeholder="Title"
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors mb-2"
							/>
							<textarea
								value={detail.detail}
								onChange={(e) =>
									updateDetail(index, "detail", e.target.value)
								}
								placeholder="Detail"
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors mb-2"
								rows={3}
							/>
							<div className="flex justify-between items-center">
								<button
									type="button"
									onClick={() => openResourcePicker(index)}
									className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								>
									{detail.resource ? "Change Image" : "Add Image"}
								</button>
								<button
									type="button"
									onClick={() => removeDetail(index)}
									className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
								>
									Remove
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<button
				type="button"
				onClick={addDetail}
				className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
			>
				Add Detail
			</button>

			{activeDetailIndex !== null && (
				<ResourcePicker
					onSelect={handleResourceSelect}
					onClose={() => setActiveDetailIndex(null)}
				/>
			)}
		</div>
	)
}

export default MotorbikeDetails
