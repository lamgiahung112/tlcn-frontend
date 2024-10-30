import { UpsertGenericMotorbikeDto } from "@/apis/generic_motorbike"
import ImageResourcePicker from "@/components/admin/image_resource_picker"
import { Category, GenericMotorbike, GenericMotorbikeImage, ImageResource } from "@/custom"
import useGenericMotorbike from "@/hooks/zustand/useGenericMotorbike"
import { _imgLink } from "@/utils/img-link"
import { useEffect, useState } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"

function AdminGenericMotorbikeDetailPage() {
	const { currentGenericMotorbike, fetchGenericMotorbike, updateGenericMotorbike } = useGenericMotorbike()
	const { id } = useParams()
    const navigate = useNavigate()

	const [formData, setFormData] = useState<Partial<GenericMotorbike>>({
		category: Category.SCOOTER,
		model: "",
		name: "",
		recommendedPrice: 0,
		description: "",
		colorInHex: "",
		colorName: "",
		engineSpecs: {},
		chassisSpecs: {},
		warrantySpecs: {},
		isAvailable: true,
	})

    const [images, setImages] = useState<ImageResource[]>([])
	const [gallery, setGallery] = useState<ImageResource[]>([])
	const [engineSpecs, setEngineSpecs] = useState<{ [key: string]: string }>({})
	const [chassisSpecs, setChassisSpecs] = useState<{ [key: string]: string }>({})
	const [warrantySpecs, setWarrantySpecs] = useState<{ [key: string]: string }>({})
	const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
	const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false)

	useEffect(() => {
		if (id) {
			fetchGenericMotorbike(Number(id))
		}
	}, [id])

    useEffect(() => {
        if (currentGenericMotorbike) {
            setFormData(currentGenericMotorbike)
            setImages(currentGenericMotorbike.images?.filter(i => !i.isGallery).map(i => i.imageResource) ?? [])
            setGallery(currentGenericMotorbike.images?.filter(i => i.isGallery).map(i => i.imageResource) ?? [])
            setEngineSpecs(currentGenericMotorbike.engineSpecs ?? {})
            setChassisSpecs(currentGenericMotorbike.chassisSpecs ?? {})
            setWarrantySpecs(currentGenericMotorbike.warrantySpecs ?? {})
        }
    }, [currentGenericMotorbike])

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

    const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
        const mainImages = images.map(i => ({imageResourceId: i.id, isGallery: false}))
        const galleryImages = gallery.map(i => ({imageResourceId: i.id, isGallery: true}))
		const finalFormData: UpsertGenericMotorbikeDto = { 
            category: formData.category!,
            description: formData.description!,
            model: formData.model!,
            name: formData.name!,
            recommendedPrice: formData.recommendedPrice!,
            engineSpecs, 
            chassisSpecs, 
            warrantySpecs, 
            images: mainImages.concat(galleryImages)
        }
		await updateGenericMotorbike(Number(id), finalFormData).then(() => {
            navigate("/admin/generic_motorbikes")
        })
	}

    const addEngineSpec = () => {
		setEngineSpecs({ ...engineSpecs, "": "" })
	}

	const updateEngineSpec = (oldKey: string, newKey: string, value: string) => {
		const updatedSpecs = { ...engineSpecs }
		if (oldKey !== newKey) {
			delete updatedSpecs[oldKey]
		}
		updatedSpecs[newKey] = value
		setEngineSpecs(updatedSpecs)
	}

	const removeEngineSpec = (key: string) => {
		const updatedSpecs = { ...engineSpecs }
		delete updatedSpecs[key]
		setEngineSpecs(updatedSpecs)
	}

	const addChassisSpec = () => {
		setChassisSpecs({ ...chassisSpecs, "": "" })
	}

	const updateChassisSpec = (oldKey: string, newKey: string, value: string) => {
		const updatedSpecs = { ...chassisSpecs }
		if (oldKey !== newKey) {
			delete updatedSpecs[oldKey]
		}
		updatedSpecs[newKey] = value
		setChassisSpecs(updatedSpecs)
	}

	const removeChassisSpec = (key: string) => {
		const updatedSpecs = { ...chassisSpecs }
		delete updatedSpecs[key]
		setChassisSpecs(updatedSpecs)
	}

	const addWarrantySpec = () => {
		setWarrantySpecs({ ...warrantySpecs, "": "" })
	}

	const updateWarrantySpec = (oldKey: string, newKey: string, value: string) => {
		const updatedSpecs = { ...warrantySpecs }
		if (oldKey !== newKey) {
			delete updatedSpecs[oldKey]
		}
		updatedSpecs[newKey] = value
		setWarrantySpecs(updatedSpecs)
	}

	const removeWarrantySpec = (key: string) => {
		const updatedSpecs = { ...warrantySpecs }
		delete updatedSpecs[key]
		setWarrantySpecs(updatedSpecs)
	}

	return (
		<div className="container p-8 flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<Link to="/admin/generic_motorbikes" className="flex items-center gap-2">
					<FaChevronLeft />
					<span>Back to List</span>
				</Link>
				<h1 className="text-2xl font-bold">Generic Motorbike Detail</h1>
			</div>
            {isImagePickerOpen && (
				<ImageResourcePicker
					isMultiple
					onClose={() => setIsImagePickerOpen(false)}
					onMultipleResourcesPick={setImages}
				/>
			)}
			{isGalleryPickerOpen && (
				<ImageResourcePicker
					isMultiple
					onClose={() => setIsGalleryPickerOpen(false)}
					onMultipleResourcesPick={setGallery}
				/>
			)}
			<form onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="category"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Category:
						</label>
						<select
							name="category"
							value={formData.category}
							onChange={handleInputChange}
							className="w-full border outline-none px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						>
							{Object.values(Category).map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
					</div>
					<div>
						<label
							htmlFor="model"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Model:
						</label>
						<input
							type="text"
							name="model"
							value={formData.model ?? ""}
							onChange={handleInputChange}
							required
							className="w-full border outline-none px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
				</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Name:
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full border outline-none px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="recommendedPrice"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Recommended Price:
                        </label>
                        <input
                            type="number"
                            name="recommendedPrice"
                            value={formData.recommendedPrice}
                            onChange={handleInputChange}
                            required
                            className="w-full border outline-none px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
				</div>
                <div>
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Description:
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleInputChange}
							className="w-full border outline-none px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
				</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="colorInHex"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Color:
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="color"
                                name="colorInHex"
                                value={formData.colorInHex}
                                onChange={handleInputChange}
                                className="h-10 w-10 border-none outline-none rounded-md cursor-pointer"
                            />
                            <input
                                type="text"
                                name="colorInHex"
                                value={formData.colorInHex}
                                onChange={handleInputChange}
                                className="flex-grow border outline-none px-3 py-2 rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="#RRGGBB"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="colorName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Color Name:
                        </label>
                        <input
                            type="text"
                            name="colorName"
                            value={formData.colorName}
                            onChange={handleInputChange}
                            className="w-full border outline-none  px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Images:
                    </label>
                    {images.length > 0 && (
                        <div className="overflow-x-auto pb-2">
                            <div className="flex space-x-2">
                                {images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="flex-shrink-0 relative"
                                    >
                                        <img
                                            src={_imgLink(image.s3Key)}
                                            alt={image.filename}
                                            className="h-24 w-24 object-cover rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsImagePickerOpen(true)}
                        className="mt-2 px-6 py-1.5 w-full sm:w-auto bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Pick images
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gallery:
                    </label>
                    {gallery.length > 0 && (
                        <div className="overflow-x-auto pb-2">
                            <div className="flex space-x-2">
                                {gallery.map((image) => (
                                    <div
                                        key={image.id}
                                        className="flex-shrink-0 relative"
                                    >
                                        <img
                                            src={_imgLink(image.s3Key)}
                                            alt={image.filename}
                                            className="h-24 w-24 object-cover rounded-md"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsGalleryPickerOpen(true)}
                        className="mt-2 px-6 py-1.5 w-full sm:w-auto bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Pick images
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Engine Specs:
                    </label>
                    {Object.entries(engineSpecs).map(([key, value], index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={key}
                                onChange={(e) =>
                                    updateEngineSpec(key, e.target.value, value)
                                }
                                placeholder="Key"
                                className="flex-1 outline-none border px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    updateEngineSpec(key, key, e.target.value)
                                }
                                placeholder="Value"
                                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => removeEngineSpec(key)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addEngineSpec}
                        className="mt-2 px-6 py-1.5 w-full sm:w-auto bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Add Engine Spec
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chassis Specs:
                    </label>
                    {Object.entries(chassisSpecs).map(([key, value], index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={key}
                                onChange={(e) =>
                                    updateChassisSpec(key, e.target.value, value)
                                }
                                placeholder="Key"
                                className="flex-1 outline-none border px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    updateChassisSpec(key, key, e.target.value)
                                }
                                placeholder="Value"
                                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => removeChassisSpec(key)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addChassisSpec}
                        className="mt-2 px-6 py-1.5 w-full sm:w-auto bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Add Chassis Specs
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Warranty Specs:
                    </label>
                    {Object.entries(warrantySpecs).map(([key, value], index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={key}
                                onChange={(e) =>
                                    updateWarrantySpec(key, e.target.value, value)
                                }
                                placeholder="Key"
                                className="flex-1 outline-none border px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <input
                                type="text"
                                value={value}
                                onChange={(e) =>
                                    updateWarrantySpec(key, key, e.target.value)
                                }
                                placeholder="Value"
                                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => removeWarrantySpec(key)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addWarrantySpec}
                        className="mt-2 px-6 py-1.5 w-full sm:w-auto bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    >
                        Add Warranty Spec
                    </button>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                    <button
                        type="button"
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Update Motorbike
                    </button>
                </div>
			</form>
            <div className="mt-6">
                <h1 className="text-2xl font-bold">Motorbikes</h1>
            </div>
		</div>
	)
}

export default AdminGenericMotorbikeDetailPage
