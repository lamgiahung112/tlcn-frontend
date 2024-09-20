import { updateColor, deleteColor } from "@/api/color"
import { Db } from "@/custom"
import useApi from "@/hooks/common/useApi"
import React, { useState } from "react"

interface ColorCardProps {
	color: Db.Color
	onUpdate: () => void
}

function ColorCard({ color, onUpdate }: ColorCardProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [name, setName] = useState(color.name)
	const [hex, setHex] = useState(color.hex)
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const { fetch: update } = useApi(updateColor)
	const { fetch: tryDelete } = useApi(deleteColor)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		update({ id: color.id, name, hex }, () => {
			setIsEditing(false)
			onUpdate()
		})
	}

	const handleDelete = () => {
		setShowDeleteConfirmation(false)
		tryDelete(color.id, onUpdate)
	}

	return (
		<div className="border rounded-lg p-4 shadow-sm">
			{isEditing ? (
				<form onSubmit={handleSubmit} className="space-y-4">
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
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="hex"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Hex Color
						</label>
						<div className="flex items-center space-x-2">
							<input
								type="text"
								id="hex"
								value={hex}
								onChange={(e) => setHex(e.target.value)}
								className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								required
							/>
							<div
								className="w-10 h-10 rounded-md border border-gray-300"
								style={{ backgroundColor: hex }}
							></div>
						</div>
					</div>
					<div className="flex justify-end space-x-2">
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							className="px-3 py-1 bg-neutral-500 text-white rounded-md hover:bg-neutral-700 transition-colors"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
						>
							Save
						</button>
					</div>
				</form>
			) : (
				<>
					<div className="flex items-center space-x-2 mb-2">
						<h3 className="text-lg font-semibold">{color.name}</h3>
						<div
							className="w-6 h-6 rounded-full border border-gray-300"
							style={{ backgroundColor: color.hex }}
						></div>
					</div>
					<p className="text-gray-600 mb-4">Hex: {color.hex}</p>
					<div className="flex space-x-2">
						<button
							onClick={() => setIsEditing(true)}
							className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
						>
							Update
						</button>
						<button
							onClick={() => setShowDeleteConfirmation(true)}
							className="px-3 py-1 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors"
						>
							Delete
						</button>
					</div>
				</>
			)}
			{showDeleteConfirmation && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h4 className="text-lg font-semibold mb-4">Confirm Deletion</h4>
						<p className="mb-4">
							Are you sure you want to delete color {color.name}?
						</p>
						<div className="flex justify-end space-x-2">
							<button
								onClick={() => setShowDeleteConfirmation(false)}
								className="px-3 py-1 bg-neutral-500 text-white rounded-md hover:bg-neutral-700 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleDelete}
								className="px-3 py-1 bg-accent text-white rounded-md hover:bg-accent-dark transition-colors"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ColorCard
