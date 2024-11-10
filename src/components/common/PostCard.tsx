import { Post } from "@/custom"
import { _imgLink } from "@/utils/img-link"
import { Link } from "react-router-dom"

function PostCard({ post, isAdmin }: { post: Post; isAdmin: boolean }) {
	const href = isAdmin ? `/admin/posts/${post.id}` : `/posts/${post.id}`

	return (
		<Link to={href} className="block group">
			<div className="flex gap-8 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
				{/* Left side - Image */}
				<div className="relative w-[400px] h-[250px] flex-shrink-0 overflow-hidden">
					<img
						src={_imgLink(post.thumbnailResource.s3Key)}
						alt={post.title}
						className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
					/>
				</div>

				{/* Right side - Content */}
				<div className="flex flex-col py-6 pr-6 flex-1">
					{/* Date */}
					<div className="text-gray-500 text-sm mb-2">
						{new Date(post.createdAt).toLocaleDateString()}
					</div>

					{/* Title */}
					<h3 className="text-2xl font-bold mb-3 line-clamp-2">{post.title}</h3>

					{/* Description */}
					<p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>

					{/* Read More Link */}
					<div className="mt-auto flex items-center text-blue-600">
						<span className="mr-2">Read more</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="w-4 h-4"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.25 4.5l7.5 7.5-7.5 7.5"
							/>
						</svg>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default PostCard
