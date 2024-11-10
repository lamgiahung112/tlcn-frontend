import PostCard from "@/components/common/PostCard"
import { Post } from "@/custom"
import { usePost } from "@/hooks/zustand/usePost"
import { useEffect, useState } from "react"

function PostPage() {
	const { posts, paginate, filter, setFilter } = usePost()

	useEffect(() => {
		paginate()
	}, [filter])

	useEffect(() => {
		paginate()
	}, [])

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Search Section */}
			<div className="mb-12">
				<h1 className="text-2xl font-bold text-center mb-6">
					TÌM KIẾM KHUYẾN MÃI
				</h1>
				<div className="max-w-2xl mx-auto flex">
					<input
						type="text"
						placeholder="Từ khóa"
						value={filter.name}
						onChange={(e) => setFilter({ name: e.target.value })}
						className="flex-1 p-3 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button className="bg-black text-white px-6 py-3 rounded-r hover:bg-gray-800 transition-colors flex items-center gap-2">
						TÌM KIẾM
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Posts Section */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">
					CÁC CHƯƠNG TRÌNH KHUYẾN MÃI
				</h2>
				<div className="space-y-6">
					{posts.map((post) => (
						<div
							key={post.id}
							className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
						>
							<PostCard post={post} isAdmin={false} />
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PostPage
