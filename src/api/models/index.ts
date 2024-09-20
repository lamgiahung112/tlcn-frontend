import { Db } from "@/custom"
import { Axios } from "@/utils/Axios"

export const getAllModels = () => {
	return Axios.get<Db.Model[]>("/models")
}

export const createModel = (data: Omit<Db.Model, "id">) => {
	return Axios.post("/models", data)
}

export const updateModel = (data: Db.Model) => {
	return Axios.put(`/models/${data.id}`, data)
}

export const deleteModel = (id: string) => {
	return Axios.delete(`/models/${id}`)
}
