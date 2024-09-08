import addResource from "@/api/admin/media-resource/addResource"
import updateResource from "@/api/admin/media-resource/updateResource"
import useData from "@/hooks/common/useData"
import { Db } from "@/custom"
import { useRef, useState } from "react"
import deleteResource from "@/api/admin/media-resource/deleteResource"

type PopupProps = {
	onClose: () => void
}

type AddMediaPopupProps = PopupProps & {}

type UpdateMediaPopupProps = PopupProps & {
	resource: Db.Resource
}

function AddMediaPopup({ onClose }: AddMediaPopupProps) {
	const [name, setName] = useState("")
	const [uploadImg, setUploadImg] = useState<Blob | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const { fetch: add, error: addErrors } = useData(addResource)

	return (
		<PopupWrapper onClose={onClose} title="Add Resource">
			<div className="flex gap-x-8">
				<div className="flex flex-col items-center gap-y-4 w-1/2">
					{uploadImg ? (
						<img
							src={URL.createObjectURL(uploadImg)}
							className="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow"
							alt="Preview"
						/>
					) : (
						<div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
							<span className="text-gray-500">No image selected</span>
						</div>
					)}
					<input
						onChange={(e) => setUploadImg(e.target.files?.[0] ?? null)}
						hidden
						type="file"
						accept="image/*"
						ref={inputRef}
					/>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
						onClick={() => inputRef.current?.click()}
					>
						Choose Image
					</button>
				</div>
				<div className="flex flex-col flex-1">
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							File name:
						</label>
						<input
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							onChange={(e) => setName(e.target.value)}
							value={name}
							placeholder="Enter file name"
						/>
					</div>
					{addErrors.length > 0 && (
						<div className="mt-4 text-red-600">
							{addErrors.map((err, index) => (
								<div key={index}>{err}</div>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="mt-6 flex justify-end">
				<button
					onClick={() => {
						if (!uploadImg) return
						add({ fileName: name, file: uploadImg }, () => {
							onClose()
						})
					}}
					className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
					disabled={!uploadImg || !name}
				>
					Add
				</button>
			</div>
		</PopupWrapper>
	)
}

function UpdateMediaPopup({ onClose, resource }: UpdateMediaPopupProps) {
	const [name, setName] = useState(resource.name)
	const { fetch: update, error: updateErrors } = useData(updateResource)
	const { fetch: remove } = useData(deleteResource)

	return (
		<PopupWrapper onClose={onClose} title="Update Resource">
			<div className="flex gap-x-8">
				<div className="flex flex-col items-center gap-y-4 w-1/2">
					<img
						src={resource.url}
						className="max-w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
						onClick={() => window.open(resource.url)}
						alt={resource.name}
					/>
					<span className="text-sm text-gray-500">
						Click to see full resolution
					</span>
				</div>
				<div className="flex flex-col flex-1">
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							File name:
						</label>
						<input
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Created At:
						</label>
						<input
							disabled
							className="w-full p-2 bg-gray-100 border border-gray-300 rounded-md"
							value={resource.created_at.replace("T", " ").replace("Z", "")}
						/>
					</div>
					{updateErrors.length > 0 && (
						<div className="mt-4 text-red-600">
							{updateErrors.map((err, index) => (
								<div key={index}>{err}</div>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="mt-6 flex justify-end gap-x-4">
				<button
					onClick={() => {
						update({ id: resource.id, fileName: name }, onClose)
					}}
					className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
					disabled={name === resource.name}
				>
					Update
				</button>
				<button
					onClick={() => remove({ id: resource.id }, onClose)}
					className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
				>
					Delete
				</button>
			</div>
		</PopupWrapper>
	)
}

function PopupWrapper({
	onClose,
	title,
	children,
}: PopupProps & { title: string; children: React.ReactNode }) {
	return (
		<div
			onClick={onClose}
			className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="bg-white w-full max-w-3xl rounded-lg shadow-xl"
			>
				<div className="flex justify-between items-center p-6 border-b">
					<h2 className="text-2xl font-semibold">{title}</h2>
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
				<div className="p-6">{children}</div>
			</div>
		</div>
	)
}

export { AddMediaPopup, UpdateMediaPopup }
