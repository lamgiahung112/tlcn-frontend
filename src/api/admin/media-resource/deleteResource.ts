import { Axios } from "@/utils/Axios"

export default function deleteResource(data: { id: string }) {
	return Axios.delete(`/resources/${data.id}`)
}
