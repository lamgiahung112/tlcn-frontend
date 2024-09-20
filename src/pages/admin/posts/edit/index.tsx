import getPostDetail from "@/api/posts/getPostDetail"
import updatePost from "@/api/posts/updatePost"
import ResourcePicker from "@/components/admin/resource-picker"
import IconChevronLeft from "@/components/common/icons/IconChevronLeft"
import { Db } from "@/custom"
import useApi from "@/hooks/common/useApi"
import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Link, useNavigate, useParams } from "react-router-dom"

function EditPostPage() {
	const { "post-id": postId } = useParams()
	const navigate = useNavigate()
	const [post, setPost] = useState<Db.Response.PostDetail | null>(null)
	const { data: fetchedPost, fetch: fetchPost } = useApi(getPostDetail)
	const { fetch: updatePostDetail } = useApi(updatePost)
	const [isThumbnailPickerOpen, setIsThumbnailPickerOpen] = useState(false)
	const [isResourcePickerOpen, setIsResourcePickerOpen] = useState(false)
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	useEffect(() => {
		fetchPost({ id: postId! })
	}, [])

	useEffect(() => {
		setPost(fetchedPost!)
	}, [fetchedPost])

	const handleSave = () => {
		updatePostDetail(post!, () => {
			navigate(`/admin/posts`)
		})
	}

	const handleAddResource = (resource: Db.Resource) => {
		const textarea = textareaRef.current
		if (!textarea) return

		const resourceMarkdown = `\n![${resource.name}](${resource.url})`

		const { selectionStart, selectionEnd } = textarea
		const newContent =
			post!.content.substring(0, selectionStart) +
			resourceMarkdown +
			post!.content.substring(selectionEnd)

		setPost({ ...post!, content: newContent })

		// Set cursor position after the inserted markdown
		setTimeout(() => {
			textarea.focus()
			const newCursorPosition = selectionStart + resourceMarkdown.length
			textarea.setSelectionRange(newCursorPosition, newCursorPosition)
		}, 0)
	}

	const handleAddThumbnail = (resource: Db.Resource) => {
		setPost({ ...post!, thumbnail: resource, thumbnail_resource_id: resource.id })
	}

	if (!post) {
		return <div>Loading...</div>
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
				<h1 className="text-3xl font-bold">Edit Post</h1>
			</div>
			<div className="mb-4">
				<label htmlFor="title" className="block text-xl font-semibold mb-2">
					Title
				</label>
				<input
					type="text"
					id="title"
					className="w-full p-2 border rounded-md"
					value={post.title}
					onChange={(e) => setPost({ ...post, title: e.target.value })}
				/>
			</div>
			<div className="mb-4">
				<h2 className="block text-xl font-semibold mb-2">Thumbnail</h2>
				{post?.thumbnail && (
					<img src={post.thumbnail.url} alt={post.thumbnail.name} />
				)}
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
					<div className="flex gap-x-4 items-center">
						<h2 className="text-xl font-semibold mb-2">Raw Markdown</h2>
						<button
							onClick={() => setIsResourcePickerOpen(true)}
							className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
						>
							Add Resource
						</button>
					</div>
					<textarea
						ref={textareaRef}
						className="w-full h-[calc(100vh-200px)] p-4 border rounded-md"
						value={post.content}
						onChange={(e) => setPost({ ...post, content: e.target.value })}
					/>
				</div>
				<div className="w-1/2">
					<h2 className="text-xl font-semibold mb-2">Preview</h2>
					<div className="w-full h-[calc(100vh-200px)] markdown-body p-4 border rounded-md overflow-auto">
						<ReactMarkdown>{post.content}</ReactMarkdown>
					</div>
				</div>
			</div>
			<div className="mt-4 flex justify-end">
				<button
					onClick={handleSave}
					className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
				>
					Save Changes
				</button>
			</div>
		</div>
	)
}

export default EditPostPage
