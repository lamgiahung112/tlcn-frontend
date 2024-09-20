import React, { useState, useEffect } from "react"
import ResourcePicker from "@/components/admin/resource-picker"
import { Db } from "@/custom"
import useApi from "@/hooks/common/useApi"
import { getAllColors } from "@/api/color"

interface VariantItem {
	name: string
	colorId: string
	resources: Db.Resource[]
}

interface MotorbikeVariantsProps {
	variants: VariantItem[]
	onVariantsChange: (newVariants: VariantItem[]) => void
}

const MotorbikeVariants: React.FC<MotorbikeVariantsProps> = ({
	variants,
	onVariantsChange,
}) => {
	const [activeVariantIndex, setActiveVariantIndex] = useState<number | null>(null)
	const { data: colors, fetch: fetchColors } = useApi(getAllColors)

	useEffect(() => {
		fetchColors(undefined)
	}, [])

	const addVariant = () => {
		onVariantsChange([...variants, { name: "", colorId: "", resources: [] }])
	}

	const removeVariant = (index: number) => {
		onVariantsChange(variants.filter((_, i) => i !== index))
	}

	const updateVariant = (
		index: number,
		field: keyof VariantItem,
		value: string | Db.Resource[]
	) => {
		const updatedVariants = [...variants]
		updatedVariants[index] = { ...updatedVariants[index], [field]: value }
		onVariantsChange(updatedVariants)
	}

	const handleResourceSelect = (resources: Db.Resource[]) => {
		if (activeVariantIndex !== null) {
			const updatedVariants = [...variants]
			updatedVariants[activeVariantIndex].resources = resources
			onVariantsChange(updatedVariants)
		}
		setActiveVariantIndex(null)
	}

	const openResourcePicker = (index: number) => {
		setActiveVariantIndex(index)
	}

	return (
		<div>
			<h2 className="text-xl font-semibold mb-4">Motorbike Variants</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{variants.map((variant, index) => (
					<div
						key={index}
						className="bg-white shadow-md rounded-lg overflow-hidden"
					>
						<div className="h-48 bg-gray-200 flex items-center justify-center">
							{variant.resources.length > 0 ? (
								<img
									src={variant.resources[0].url}
									alt={variant.name}
									className="w-full h-full object-cover"
								/>
							) : (
								<span className="text-gray-400">No image</span>
							)}
						</div>
						<div className="p-4">
							<input
								type="text"
								value={variant.name}
								onChange={(e) =>
									updateVariant(index, "name", e.target.value)
								}
								placeholder="Variant Name"
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors mb-2"
							/>
							<select
								value={variant.colorId}
								onChange={(e) =>
									updateVariant(index, "colorId", e.target.value)
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors mb-2"
							>
								<option value="">Select a color</option>
								{colors?.map((color) => (
									<option key={color.id} value={color.id}>
										{color.name}
									</option>
								))}
							</select>
							<div className="flex justify-between items-center">
								<button
									type="button"
									onClick={() => openResourcePicker(index)}
									className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
								>
									{variant.resources.length > 0
										? "Change Images"
										: "Add Images"}
								</button>
								<button
									type="button"
									onClick={() => removeVariant(index)}
									className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
								>
									Remove
								</button>
							</div>
							{variant.resources.length > 0 && (
								<div className="mt-2 flex flex-wrap gap-2">
									{variant.resources.map((resource) => (
										<img
											key={resource.id}
											src={resource.url}
											alt={resource.name}
											className="w-16 h-16 object-cover rounded-md"
										/>
									))}
								</div>
							)}
						</div>
					</div>
				))}
			</div>
			<button
				type="button"
				onClick={addVariant}
				className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
			>
				Add Variant
			</button>

			{activeVariantIndex !== null && (
				<ResourcePicker
					isMultiple={true}
					onClose={() => setActiveVariantIndex(null)}
					onSelectMultiple={(resources) => handleResourceSelect(resources)}
				/>
			)}
		</div>
	)
}

export default MotorbikeVariants
