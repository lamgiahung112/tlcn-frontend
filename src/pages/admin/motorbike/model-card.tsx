import { deleteModel, updateModel } from "@/api/models"
import { Db } from "@/custom"
import useApi from "@/hooks/common/useApi"
import React, { useState } from "react"

interface ModelCardProps {
	model: Db.Model
	onUpdate: () => void
}

function ModelCard({ model, onUpdate }: ModelCardProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [name, setName] = useState(model.name)
	const [description, setDescription] = useState(model.description)
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
	const { fetch: update } = useApi(updateModel)
	const { fetch: tryDelete } = useApi(deleteModel)
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		update({ id: model.id, name, description }, () => {
			setIsEditing(false)
			onUpdate()
		})
	}

	const handleDelete = () => {
		setShowDeleteConfirmation(false)
		tryDelete(model.id)
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
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-1"
						>
							Description
						</label>
						<textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
							rows={3}
							required
						></textarea>
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
					<h3 className="text-lg font-semibold mb-2">{model.name}</h3>
					<p className="text-gray-600 mb-4">{model.description}</p>
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
							Are you sure you want to delete model {model.name} and all
							motorbikes of this model?
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

export default ModelCard
