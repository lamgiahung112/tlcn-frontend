import { Motorbike } from "@/custom"
import { Axios } from "@/utils/Axios"

export function apiGetUserMotorbikes() {
	return Axios.get<Motorbike[]>("/motorbikes/user")
}

export function apiGetMotorbikeDetail(id: number) {
	return Axios.get<Motorbike>(`/motorbikes/${id}`)
}
