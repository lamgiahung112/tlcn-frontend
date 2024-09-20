import { Db } from "@/custom"
import { Axios } from "@/utils/Axios"

export const getAllColors = () => {
	return Axios.get<Db.Color[]>("/colors")
}

export const createColor = (data: Omit<Db.Color, "id">) => {
	return Axios.post("/colors", data)
}

export const updateColor = (data: Db.Color) => {
	return Axios.put(`/colors/${data.id}`, data)
}

export const deleteColor = (id: string) => {
	return Axios.delete(`/colors/${id}`)
}
