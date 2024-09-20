import getMediaResourceList from "@/api/admin/media-resource/getMediaResourceList"
import { Db } from "@/custom"
import useApi from "@/hooks/common/useApi"
import React, { useState, useEffect } from "react"

interface ResourcePickerProps {
	isMultiple?: boolean
	onClose: () => void
	onSelect?: (resource: Db.Resource) => void
	onSelectMultiple?: (resources: Db.Resource[]) => void
}

const ResourcePicker: React.FC<ResourcePickerProps> = ({
	isMultiple = false,
	onClose,
	onSelect,
	onSelectMultiple,
}) => {
	const [filter, setFilter] = useState("")
	const [selectedResources, setSelectedResources] = useState<Db.Resource[]>([])
	const { data, fetch } = useApi(getMediaResourceList)

	useEffect(() => {
		fetch({
			name: filter,
			page: 0,
			size: 10,
			sort: {
				created_at: undefined,
			},
		})
	}, [filter])

	const handleResourceClick = (resource: Db.Resource) => {
		if (isMultiple) {
			const isSelected = selectedResources.some((r) => r.id === resource.id)
			if (isSelected) {
				setSelectedResources(
					selectedResources.filter((r) => r.id !== resource.id)
				)
			} else {
				setSelectedResources([...selectedResources, resource])
			}
		} else {
			onSelect?.call(null, resource)
			onClose()
		}
	}

	const handleConfirm = () => {
		if (isMultiple && onSelectMultiple) {
			onSelectMultiple(selectedResources)
			onClose()
		}
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-2xl font-semibold">Pick a Resource</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<div className="p-6">
					<div className="flex gap-x-4 mb-4">
						<input
							type="text"
							placeholder="Filter by name"
							className="flex-grow p-2 border rounded-md"
							value={filter}
							onChange={(e) => setFilter(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
						{data &&
							data.map((resource) => (
								<div
									key={resource.id}
									className={`border rounded-md p-2 cursor-pointer hover:bg-gray-100 ${
										isMultiple &&
										selectedResources.some(
											(r) => r.id === resource.id
										)
											? "border-primary-dark bg-primary-light"
											: ""
									}`}
									onClick={() => handleResourceClick(resource)}
								>
									<img
										src={resource.url}
										alt={resource.name}
										className="w-full h-32 object-cover mb-2 rounded"
									/>
									<div className="text-sm font-medium truncate">
										{resource.name}
									</div>
									<div className="text-xs text-gray-500">
										{resource.created_at}
									</div>
								</div>
							))}
					</div>
					{isMultiple && (
						<div className="mt-4 flex justify-end">
							<button
								onClick={handleConfirm}
								className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
							>
								Confirm Selection ({selectedResources.length})
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ResourcePicker
