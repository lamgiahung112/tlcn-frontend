import { createColor } from "@/api/color"
import useApi from "@/hooks/common/useApi"
import React, { useState } from "react"

interface AddColorCardProps {
	onClose: () => void
}

function AddColorCard({ onClose }: AddColorCardProps) {
	const [name, setName] = useState("")
	const [hex, setHex] = useState("#000000")
	const { fetch: add } = useApi(createColor)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		add({ name, hex }, onClose, onClose)
	}

	return (
		<div className="border rounded-lg p-4 shadow-sm relative">
			<button
				onClick={onClose}
				className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				aria-label="Close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
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
						<input
							type="color"
							value={hex}
							onChange={(e) => setHex(e.target.value)}
							className="w-10 h-10 rounded-md border border-gray-300 cursor-pointer"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center justify-center"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
							clipRule="evenodd"
						/>
					</svg>
					Add Color
				</button>
			</form>
		</div>
	)
}

export default AddColorCard
