import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Db } from "@/custom"
import useApi from "@/hooks/common/useApi"
import ResourcePicker from "@/components/admin/resource-picker"
import { getAllModels } from "@/api/models"
import MotorbikeDetails from "./details"
import { addMotorbike } from "@/api/motorbike"
import MotorbikeVariants from "./variants"

const AddMotorbikePage: React.FC = () => {
	const navigate = useNavigate()
	const [name, setName] = useState("")
	const [category, setCategory] = useState<Db.Category>("STROKE")
	const [modelId, setModelId] = useState("")
	const [recommendedPrice, setRecommendedPrice] = useState("")
	const [description, setDescription] = useState("")
	const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false)
	const [gallery, setGallery] = useState<Db.Resource[]>([])
	const [engineSpecs, setEngineSpecs] = useState<Record<string, string>>({})
	const [chassisSpecs, setChassisSpecs] = useState<Record<string, string>>({})
	const [sizeSpecs, setSizeSpecs] = useState<Record<string, string>>({})
	const [warrantySpecs, setWarrantySpecs] = useState<Record<string, string>>({})
	const [details, setDetails] = useState<
		{
			title: string
			detail: string
			resource?: Db.Resource
		}[]
	>([])
	const [variants, setVariants] = useState<
		{
			name: string
			colorId: string
			resources: Db.Resource[]
		}[]
	>([])

	const handleVariantsChange = (
		newVariants: {
			name: string
			colorId: string
			resources: Db.Resource[]
		}[]
	) => {
		setVariants(newVariants)
	}

	const handleDetailsChange = (
		newDetails: {
			title: string
			detail: string
			resource?: Db.Resource
		}[]
	) => {
		setDetails(newDetails)
	}

	const { data: models, fetch: fetchModels } = useApi(getAllModels)
	const { fetch: create } = useApi(addMotorbike)

	useEffect(() => {
		fetchModels(undefined)
	}, [])

	const handleSpecChange = (
		specType: "engine" | "chassis" | "size" | "warranty",
		key: string,
		value: string,
		newKey?: string
	) => {
		const setterMap = {
			engine: setEngineSpecs,
			chassis: setChassisSpecs,
			size: setSizeSpecs,
			warranty: setWarrantySpecs,
		}
		setterMap[specType]((prev) => {
			const updated = { ...prev }
			if (newKey && newKey !== key) {
				delete updated[key]
				updated[newKey] = value
			} else {
				updated[key] = value
			}
			return updated
		})
	}

	const addSpec = (specType: "engine" | "chassis" | "size" | "warranty") => {
		const setterMap = {
			engine: setEngineSpecs,
			chassis: setChassisSpecs,
			size: setSizeSpecs,
			warranty: setWarrantySpecs,
		}
		setterMap[specType]((prev) => ({ ...prev, "": "" }))
	}

	const removeSpec = (
		specType: "engine" | "chassis" | "size" | "warranty",
		key: string
	) => {
		const setterMap = {
			engine: setEngineSpecs,
			chassis: setChassisSpecs,
			size: setSizeSpecs,
			warranty: setWarrantySpecs,
		}
		setterMap[specType]((prev) => {
			const updated = { ...prev }
			delete updated[key]
			return updated
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await addMotorbike({
				name,
				category,
				modelId: modelId,
				recommendedPrice: parseInt(recommendedPrice),
				description,
				gallery: gallery.map((resource) => resource.id),
				engineSpecs: engineSpecs,
				chassisSpecs: chassisSpecs,
				sizeSpecs: sizeSpecs,
				warrantySpecs: warrantySpecs,
				detail: details.map((d) => ({
					title: d.title,
					detail: d.detail,
					resource_id: d.resource?.id,
				})),
				variants: variants.map((v) => ({
					name: v.name,
					color_id: v.colorId,
					displayPictures: v.resources.map((r) => r.id),
				})),
			})
			navigate("/admin/motorbikes")
		} catch (error) {
			console.error("Error adding motorbike:", error)
		}
	}

	const renderSpecInputs = (
		specType: "engine" | "chassis" | "size" | "warranty",
		specs: Record<string, string>
	) => (
		<div>
			<h2 className="block text-sm font-medium text-gray-700 mb-1">
				{specType.charAt(0).toUpperCase() + specType.slice(1)} Specifications
			</h2>
			{Object.entries(specs).map(([key, value], index) => (
				<div key={index} className="flex items-center space-x-2 mb-2">
					<input
						type="text"
						value={key}
						onChange={(e) =>
							handleSpecChange(specType, key, value, e.target.value)
						}
						placeholder="Key"
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
					/>
					<input
						type="text"
						value={value}
						onChange={(e) => handleSpecChange(specType, key, e.target.value)}
						placeholder="Value"
						className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
					/>
					<button
						type="button"
						onClick={() => removeSpec(specType, key)}
						className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
					>
						Remove
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={() => addSpec(specType)}
				className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
			>
				Add {specType} spec
			</button>
		</div>
	)

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Add New Motorbike</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="category"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Category
					</label>
					<select
						id="category"
						value={category}
						onChange={(e) => setCategory(e.target.value as Db.Category)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none bg-white"
						required
					>
						<option value="STROKE">Stroke</option>
						<option value="SCOOTER">Scooter</option>
						<option value="HEAVYBIKE">Heavy Bike</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="model"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Model
					</label>
					<select
						id="model"
						value={modelId}
						onChange={(e) => setModelId(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none bg-white"
						required
					>
						<option value="">Select a model</option>
						{models?.map((model) => (
							<option key={model.id} value={model.id}>
								{model.name}
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="recommendedPrice"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Recommended Price
					</label>
					<input
						type="number"
						id="recommendedPrice"
						value={recommendedPrice}
						onChange={(e) => setRecommendedPrice(e.target.value)}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="description"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Description
					</label>
					<textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						rows={4}
						className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
						required
					></textarea>
				</div>

				{renderSpecInputs("engine", engineSpecs)}
				{renderSpecInputs("chassis", chassisSpecs)}
				{renderSpecInputs("size", sizeSpecs)}
				{renderSpecInputs("warranty", warrantySpecs)}
				<MotorbikeDetails
					details={details}
					onDetailsChange={handleDetailsChange}
				/>
				<MotorbikeVariants
					variants={variants}
					onVariantsChange={handleVariantsChange}
				/>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Gallery
					</label>
					<button
						type="button"
						onClick={() => setIsGalleryPickerOpen(true)}
						className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
					>
						Select Images
					</button>
					<div className="mt-2 flex flex-wrap gap-2">
						{gallery.map((resource) => (
							<img
								key={resource.id}
								src={resource.url}
								alt={resource.name}
								className="w-20 h-20 object-cover rounded-md shadow-sm"
							/>
						))}
					</div>
				</div>

				<div className="flex justify-end space-x-2">
					<button
						type="button"
						onClick={() => navigate("/admin/motorbikes")}
						className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="px-4 py-2 bg-primary border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
					>
						Add Motorbike
					</button>
				</div>
			</form>

			{isGalleryPickerOpen && (
				<ResourcePicker
					isMultiple={true}
					onClose={() => setIsGalleryPickerOpen(false)}
					onSelectMultiple={(resources) => {
						setGallery(resources)
						setIsGalleryPickerOpen(false)
					}}
				/>
			)}
		</div>
	)
}

export default AddMotorbikePage
