import { Axios } from "@/utils/Axios"

export default function updatePost(data: {
	content: string
	title: string
	thumbnail_resource_id: string
	id: string
}) {
	return Axios.put(`/posts/${data.id}`, data)
}
