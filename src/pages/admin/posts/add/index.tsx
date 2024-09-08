import addPost from "@/api/posts/addPost"
import ResourcePicker from "@/components/admin/resource-picker"
import IconChevronLeft from "@/components/common/icons/IconChevronLeft"
import { Db } from "@/custom"
import useData from "@/hooks/common/useData"
import { useState, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Link, useNavigate } from "react-router-dom"

function AddPostPage() {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)
	const [content, setContent] = useState("")
	const [title, setTitle] = useState("")
	const navigate = useNavigate()
	const [isResourcePickerOpen, setIsResourcePickerOpen] = useState(false)
	const [isThumbnailPickerOpen, setIsThumbnailPickerOpen] = useState(false)
	const [thumbnail, setThumbnail] = useState<Db.Resource | null>(null)
	const { fetch: add } = useData(addPost)

	const handleSave = () => {
		if (!title || !content || !thumbnail) {
			return
		}
		add(
			{
				content,
				title,
				thumbnail_resource_id: thumbnail.id,
			},
			() => {
				navigate("/admin/posts")
			}
		)
	}

	const handleAddThumbnail = (resource: Db.Resource) => {
		setThumbnail(resource)
	}

	const handleAddResource = (resource: Db.Resource) => {
		const textarea = textareaRef.current
		if (!textarea) return

		const resourceMarkdown = `\n![${resource.name}](${resource.url})`

		const { selectionStart, selectionEnd } = textarea
		const newContent =
			content.substring(0, selectionStart) +
			resourceMarkdown +
			content.substring(selectionEnd)

		setContent(newContent)

		// Set cursor position after the inserted markdown
		setTimeout(() => {
			textarea.focus()
			const newCursorPosition = selectionStart + resourceMarkdown.length
			textarea.setSelectionRange(newCursorPosition, newCursorPosition)
		}, 0)
	}

	return (
		<div className="flex flex-col gap-y-4 px-4 py-6 w-full h-minus-header overflow-auto">
			{isResourcePickerOpen && (
				<ResourcePicker
					onClose={() => {
						setIsResourcePickerOpen(false)
					}}
					onSelect={handleAddResource}
				/>
			)}

			<div className="flex items-center gap-x-4 mb-4">
				<Link to="/admin/posts">
					<IconChevronLeft />
				</Link>
				<h1 className="text-3xl font-bold">Add Post</h1>
			</div>
			<div className="mb-4">
				<label htmlFor="title" className="block text-xl font-semibold mb-2">
					Title
				</label>
				<input
					type="text"
					id="title"
					className="w-full p-2 border rounded-md"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<h2 className="block text-xl font-semibold mb-2">Thumbnail</h2>
				{thumbnail && <img src={thumbnail.url} alt={thumbnail.name} />}
				<button
					onClick={() => setIsThumbnailPickerOpen(true)}
					className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
				>
					Choose an image
				</button>
				{isThumbnailPickerOpen && (
					<ResourcePicker
						onClose={() => {
							setIsThumbnailPickerOpen(false)
						}}
						onSelect={handleAddThumbnail}
					/>
				)}
			</div>
			<div className="flex gap-x-4">
				<div className="w-1/2">
					<div className="flex justify-between items-center mb-2">
						<h2 className="text-xl font-semibold">Raw Content</h2>
						<button
							onClick={() => setIsResourcePickerOpen(true)}
							className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
						>
							Add Resource
						</button>
					</div>
					<textarea
						ref={textareaRef}
						className="w-full h-[calc(100vh-340px)] p-4 border rounded-md"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<div className="w-1/2">
					<h2 className="text-xl font-semibold mb-2">Preview</h2>
					<div className="w-full h-[calc(100vh-200px)] markdown-body p-4 border rounded-md overflow-auto">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>
				</div>
			</div>
			<div className="mt-4 flex justify-end">
				<button
					onClick={handleSave}
					className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
				>
					Submit
				</button>
			</div>
		</div>
	)
}

export default AddPostPage
