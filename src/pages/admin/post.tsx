import { usePost } from "@/hooks/zustand/usePost"
import { _imgLink } from "@/utils/img-link"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function AdminPostPage() {
	const {
		adminPaginate,
		posts,
		filter,
		setFilter,
		publishPost,
		unpublishPost,
		deletePost,
	} = usePost()
	const navigate = useNavigate()

	useEffect(() => {
		adminPaginate()
	}, [])

	useEffect(() => {
		adminPaginate()
	}, [JSON.stringify(filter)])

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Posts</h1>
				<Link
					to="/admin/posts/create"
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
				>
					Add Post
				</Link>
			</div>
			<div className="mb-6 flex gap-6">
				<div className="flex flex-col gap-2">
					<label htmlFor="search" className="font-medium">
						Search by title
					</label>
					<input
						id="search"
						type="text"
						placeholder="Enter title..."
						onChange={(e) => setFilter({ ...filter, name: e.target.value })}
						className="border p-2 rounded w-full max-w-md"
					/>
				</div>

				<div className="flex gap-6">
					<div className="flex flex-col gap-2">
						<label htmlFor="page" className="font-medium">
							Page
						</label>
						<input
							id="page"
							type="number"
							placeholder="Page"
							min="1"
							value={filter.page || 1}
							onChange={(e) =>
								setFilter({ ...filter, page: parseInt(e.target.value) })
							}
							className="border p-2 rounded w-24"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="perPage" className="font-medium">
							Items per page
						</label>
						<select
							id="perPage"
							value={filter.perPage || 10}
							onChange={(e) =>
								setFilter({
									...filter,
									perPage: parseInt(e.target.value),
								})
							}
							className="border p-2 rounded w-24"
						>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full border-collapse bg-white shadow-sm rounded-lg">
					<thead className="bg-gray-50">
						<tr>
							<th className="p-4 text-left">Thumbnail</th>
							<th className="p-4 text-left">Title</th>
							<th className="p-4 text-left">Created At</th>
							<th className="p-4 text-left">Published</th>
							<th className="p-4 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post) => (
							<tr key={post.id} className="border-t hover:bg-gray-50">
								<td className="p-4">
									<div className="relative w-20 h-12">
										<img
											src={_imgLink(post.thumbnailResource.s3Key)}
											alt={post.title}
											className="object-cover rounded w-full h-full"
										/>
									</div>
								</td>
								<td className="p-4">{post.title}</td>
								<td className="p-4">
									{new Date(post.createdAt).toLocaleDateString()}
								</td>
								<td className="p-4">
									{post.isPublished ? "Published" : "Draft"}
								</td>
								<td className="p-4">
									<div className="flex gap-2">
										<button
											onClick={() =>
												navigate(`/admin/posts/${post.id}`)
											}
											className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
										>
											Edit
										</button>
										<button
											onClick={() =>
												post.isPublished
													? unpublishPost(post.id).then(
															adminPaginate
													  )
													: publishPost(post.id).then(
															adminPaginate
													  )
											}
											className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
										>
											{post.isPublished ? "Unpublish" : "Publish"}
										</button>
										<button
											onClick={() =>
												window.confirm(
													`Are you sure you want to delete this post with title "${post.title}"?`
												) &&
												deletePost(post.id).then(adminPaginate)
											}
											className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminPostPage
