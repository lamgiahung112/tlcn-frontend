import { GenericMotorbike } from "@/custom"
import { _currency } from "@/utils/format"
import { _imgLink } from "@/utils/img-link"
import React from "react"
import { Link } from "react-router-dom"

interface GenericMotorbikeItemProps {
	item: GenericMotorbike
}

const GenericMotorbikeItem: React.FC<GenericMotorbikeItemProps> = ({ item }) => {
	return (
		<div className="border rounded-lg overflow-hidden shadow-lg">
			<div className="h-48">
				{item.images && item.images[0] && (
					<img
						src={_imgLink(item.images[0].imageResource.s3Key)}
						alt={item.name}
						className="w-full h-full object-cover"
					/>
				)}
			</div>
			<div className="p-4">
				<h2 className="text-xl font-bold mb-2">{item.name}</h2>
				<p className="text-gray-600 mb-2">{item.model}</p>
				<p className="text-green-600 font-bold mb-2">
					{_currency(item.recommendedPrice)}
				</p>
				<p className="text-sm text-gray-500 mb-4">{item.category}</p>
				<Link
					to={`/admin/generic_motorbikes/${item.id}`}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
				>
					View Details
				</Link>
			</div>
		</div>
	)
}

export default GenericMotorbikeItem
