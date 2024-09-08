import { Db } from "@/custom"
import { useNavigate } from "react-router-dom"

interface PostItemProps {
	isAdmin?: boolean
	post: Db.Response.PostItem
}

function PostItem(props: PostItemProps) {
	const navigate = useNavigate()
	return (
		<div
			key={props.post.id}
			onClick={() => {
				if (props.isAdmin) {
					navigate(`/admin/posts/${props.post.id}`)
				} else {
					navigate(`/posts/${props.post.id}`)
				}
			}}
			className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
		>
			<img
				src={props.post.thumbnail.url}
				alt={props.post.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h2 className="text-xl font-semibold mb-2">{props.post.title}</h2>
				<div className="flex justify-between text-sm text-gray-500">
					<span>{new Date(props.post.created_at).toLocaleDateString()}</span>
					<span>{props.post.views} views</span>
				</div>
			</div>
		</div>
	)
}

export default PostItem
