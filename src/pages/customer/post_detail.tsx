import { usePost } from "@/hooks/zustand/usePost"
import { _imgLink } from "@/utils/img-link"
import { useEffect } from "react"
import { FaChevronLeft } from "react-icons/fa"
import Markdown from "react-markdown"
import { Link, useParams } from "react-router-dom"

function PostDetailPage() {
	const { currentPost, findPost } = usePost()
	const { id } = useParams()

	useEffect(() => {
		if (id) findPost(parseInt(id))
	}, [id])

	return (
		<div className="flex flex-col gap-y-4">
			<Link to="/posts" className="flex items-center gap-x-2 text-lg font-semibold">
				<FaChevronLeft />
				Back to List
			</Link>
			<div className="min-h-screen bg-transparent py-12">
				<article className="container mx-auto px-4">
					{/* Main content wrapper with max-width */}
					<div className="max-w-3xl mx-auto">
						{/* Title */}
						<h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
							{currentPost?.title}
						</h1>

						{/* Create Date */}
						<div className="text-gray-600 text-center mb-8">
							{new Date(currentPost?.createdAt ?? 0).toLocaleDateString(
								"vi-VN",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								}
							)}
						</div>

						{/* Excerpt */}
						<div className="text-lg text-gray-600 mb-8 italic">
							{currentPost?.excerpt}
						</div>

						{/* Content */}
						<div className="prose prose-lg max-w-none">
							<Markdown className="markdown-body">
								{currentPost?.content}
							</Markdown>
						</div>
					</div>
				</article>
			</div>
		</div>
	)
}

export default PostDetailPage
