import { Axios } from "@/utils/Axios"

export default function updateResource(data: { id: string; fileName: string }) {
	return Axios.post(`/resources/${data.id}`, { fileName: data.fileName })
}
