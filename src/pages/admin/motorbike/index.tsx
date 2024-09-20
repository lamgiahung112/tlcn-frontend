import { useEffect, useState } from "react"
import ModelCard from "./model-card"
import useApi from "@/hooks/common/useApi"
import { getAllModels } from "@/api/models"
import { getAllColors } from "@/api/color"
import AddModelCard from "./add-model-card"
import ColorCard from "./color-card"
import AddColorCard from "./add-color-card"
import { useNavigate } from "react-router-dom"

const MotorbikePage = () => {
	const navigate = useNavigate()
	const { data: models, fetch: fetchModels } = useApi(getAllModels)
	const { data: colors, fetch: fetchColors } = useApi(getAllColors)

	const [isAddingModel, setIsAddingModel] = useState(false)
	const [isAddingColor, setIsAddingColor] = useState(false)

	useEffect(() => {
		fetchModels(undefined)
		fetchColors(undefined)
	}, [])

	return (
		<div className="flex flex-col gap-y-8 px-4 py-6 w-full h-minus-header overflow-auto">
			<section>
				<div className="flex items-center gap-x-4 mb-4">
					<h2 className="text-2xl font-semibold">Models</h2>
					<button
						onClick={() => setIsAddingModel(true)}
						className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
					>
						Add Model
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{isAddingModel && (
						<AddModelCard
							onClose={() => {
								setIsAddingModel(false)
								fetchModels(undefined)
							}}
						/>
					)}
					{models?.map((model) => (
						<ModelCard
							key={model.id}
							onUpdate={() => fetchModels(undefined)}
							model={model}
						/>
					))}
				</div>
			</section>
			<section>
				<div className="flex gap-x-4 items-center mb-4">
					<h2 className="text-2xl font-semibold">Colors</h2>
					<button
						onClick={() => setIsAddingColor(true)}
						className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
					>
						Add Color
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{isAddingColor && (
						<AddColorCard
							onClose={() => {
								setIsAddingColor(false)
								fetchColors(undefined)
							}}
						/>
					)}
					{colors?.map((color) => (
						<ColorCard
							onUpdate={() => fetchColors(undefined)}
							key={color.id}
							color={color}
						/>
					))}
				</div>
			</section>
			<section>
				<div className="flex gap-x-4 items-center mb-4">
					<h2 className="text-2xl font-semibold">Motorbikes</h2>
					<button
						onClick={() => navigate("/admin/motorbikes/add")}
						className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
					>
						Add Motorbike
					</button>
				</div>
				<p className="text-gray-600">This section is empty for now.</p>
			</section>
		</div>
	)
}

export default MotorbikePage
