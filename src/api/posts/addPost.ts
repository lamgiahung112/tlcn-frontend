import { Axios } from "@/utils/Axios"

export default function addPost(data: {
	content: string
	title: string
	thumbnail_resource_id: string
}) {
	return Axios.post("/posts", data)
}
