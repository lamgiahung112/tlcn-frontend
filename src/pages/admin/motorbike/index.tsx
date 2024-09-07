import { useState } from "react"
import ModelCard from "./model-card"

type Model = {
	id: string
	name: string
	description: string
}

const sampleModels: Model[] = [
	{ id: "1", name: "Sport", description: "High-performance sports bikes" },
	{ id: "2", name: "Cruiser", description: "Comfortable long-distance bikes" },
	{ id: "3", name: "Adventure", description: "Versatile on-road and off-road bikes" },
]

const MotorbikePage = () => {
	const [models, setModels] = useState<Model[]>(sampleModels)

	return (
		<div className="flex flex-col gap-y-8 px-4 py-6 w-full h-minus-header overflow-auto">
			<section>
				<h2 className="text-2xl font-semibold mb-4">Models</h2>
				<div className="mb-4">
					<button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
						Add Model
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{models.map((model) => (
						<ModelCard key={model.id} model={model} />
					))}
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4">Motorbikes</h2>
				<p className="text-gray-600">This section is empty for now.</p>
			</section>
		</div>
	)
}

export default MotorbikePage
