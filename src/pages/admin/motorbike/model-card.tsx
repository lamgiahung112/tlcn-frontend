import { Db } from "@/custom"

interface ModelCardProps {
	model: Db.Model
}

function ModelCard(props: ModelCardProps) {
	return (
		<div key={props.model.id} className="border rounded-lg p-4 shadow-sm">
			<h3 className="text-lg font-semibold mb-2">{props.model.name}</h3>
			<p className="text-gray-600 mb-4">{props.model.description}</p>
			<button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
				Update
			</button>
		</div>
	)
}

export default ModelCard
