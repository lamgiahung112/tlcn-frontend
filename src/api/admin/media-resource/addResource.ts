import { Axios } from "@/utils/Axios"

export default function addResource(data: { fileName: string; file: Blob }) {
	const formData = new FormData()
	formData.append("file", data.file)
	formData.append("name", data.fileName)

	return Axios.post("/resources", formData)
}
