import ImageResourcePicker from "@/components/admin/image_resource_picker"
import { ImageResource } from "@/custom"
import { usePost } from "@/hooks/zustand/usePost"
import { _imgLink } from "@/utils/img-link"
import { useEffect, useRef, useState } from "react"
import Markdown from "react-markdown"
import { useNavigate, useParams } from "react-router-dom"

function AdminEditPostPage() {
	const { id } = useParams()
	const { findPost, currentPost, updatePost } = usePost()
	const [title, setTitle] = useState("")
	const [excerpt, setExcerpt] = useState("")
	const [isThumbnailPickerOpen, setIsThumbnailPickerOpen] = useState(false)
	const [thumbnailResource, setThumbnailResource] = useState<ImageResource | null>(null)
	const [content, setContent] = useState("")
	const [isContentImagePickerOpen, setIsContentImagePickerOpen] = useState(false)
	const contentRef = useRef<HTMLTextAreaElement>(null)
	const navigate = useNavigate()

	useEffect(() => {
		findPost(Number(id))
	}, [id])

	useEffect(() => {
		if (currentPost) {
			setTitle(currentPost.title)
			setExcerpt(currentPost.excerpt)
			setThumbnailResource(currentPost.thumbnailResource)
			setContent(currentPost.content)
		}
	}, [currentPost])

	function onContentImagePicked(resource: ImageResource) {
		if (contentRef.current) {
			const textarea = contentRef.current
			const start = textarea.selectionStart
			const end = textarea.selectionEnd
			const imageMarkdown = `![${resource.filename}](${_imgLink(resource.s3Key)})`

			const newContent =
				content.substring(0, start) + imageMarkdown + content.substring(end)

			setContent(newContent)

			setTimeout(() => {
				textarea.focus()
				const newCursorPos = start + imageMarkdown.length
				textarea.setSelectionRange(newCursorPos, newCursorPos)
			}, 0)
		}
	}

	function onSubmit() {
		if (!thumbnailResource) return
		if (!title) return
		if (!content) return
		if (!excerpt) return

		updatePost(Number(id), {
			content,
			title,
			excerpt,
			thumbnailResourceId: thumbnailResource.id,
		})
			.then(() => {
				navigate("/admin/posts")
			})
			.catch((error) => {
				window.alert(`Failed to create post: ${error.message}`)
			})
	}

	return (
		<div className="w-full px-4 py-8">
			{/** IMAGE RESOURCE PICKER */}
			{isThumbnailPickerOpen && (
				<ImageResourcePicker
					isMultiple={false}
					onSingleResourcePick={setThumbnailResource}
					onClose={() => setIsThumbnailPickerOpen(false)}
				/>
			)}
			{isContentImagePickerOpen && (
				<ImageResourcePicker
					isMultiple={false}
					onSingleResourcePick={onContentImagePicked}
					onClose={() => setIsContentImagePickerOpen(false)}
				/>
			)}
			<div className="mx-auto">
				{/* Header */}
				<h1 className="text-3xl font-bold mb-8">Update a Post</h1>

				{/* Form */}
				<div className="space-y-6 mb-16">
					{/* Title Input */}
					<div className="flex flex-col gap-2">
						<label htmlFor="title" className="font-medium">
							Title
						</label>
						<input
							id="title"
							type="text"
							placeholder="Enter post title..."
							className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<div className="font-medium flex gap-x-4">
							Thumbnail
							<button
								className="text-blue-500 hover:text-blue-600"
								onClick={() => setIsThumbnailPickerOpen(true)}
							>
								Pick an image
							</button>
						</div>
						{thumbnailResource && (
							<div className="relative">
								<img
									src={_imgLink(thumbnailResource.s3Key)}
									alt="Thumbnail"
									className="object-cover rounded w-full h-full"
								/>
							</div>
						)}
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="excerpt" className="font-medium">
							Excerpt
						</label>
						<input
							id="title"
							type="text"
							placeholder="Enter post excerpt..."
							className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={excerpt}
							onChange={(e) => setExcerpt(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex justify-between gap-x-4">
							<div className="font-medium flex justify-between w-full">
								Content
								<button
									className="text-blue-500 hover:text-blue-600"
									onClick={() => setIsContentImagePickerOpen(true)}
								>
									Add Image
								</button>
							</div>
							<div className="font-medium w-full">Preview</div>
						</div>
						<div className="flex justify-between gap-x-4">
							<textarea
								ref={contentRef}
								value={content}
								onChange={(e) => setContent(e.target.value)}
								className="flex-1 border rounded-lg p-3"
							/>
							<Markdown className="flex-1 border rounded-lg p-3 markdown-body">
								{content}
							</Markdown>
						</div>
					</div>

					<button
						onClick={onSubmit}
						className="bg-blue-500 text-white px-4 py-2 rounded-lg"
					>
						Create Post
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminEditPostPage
