import { Axios } from "@/utils/Axios"
import { Db } from "@/custom"

export default async function getPostList() {
	return Axios.get<Db.Response.PostItem[]>("/posts")
}
