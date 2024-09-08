import { Db } from "@/custom"
import { Axios } from "@/utils/Axios"

export default function getPostDetail(data: { id: string }) {
	return Axios.get<Db.Response.PostDetail>(`/posts/${data.id}`)
}
