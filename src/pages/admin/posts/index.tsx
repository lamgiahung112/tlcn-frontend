import getPostList from "@/api/posts/getPostList"
import PostItem from "@/components/common/post-item"
import useApi from "@/hooks/common/useApi"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function PostsPage() {
	const navigate = useNavigate()
	const { data: posts, fetch: fetchPosts } = useApi(getPostList, [])

	useEffect(() => {
		fetchPosts(undefined)
	}, [])

	return (
		<div className="flex flex-col gap-y-4 px-4 py-6 w-full h-minus-header overflow-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Posts</h1>
				<button
					onClick={() => navigate("/admin/posts/add")}
					className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
				>
					Create New Post
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{posts &&
					posts.map((post) => <PostItem key={post.id} post={post} isAdmin />)}
			</div>
		</div>
	)
}

export default PostsPage
