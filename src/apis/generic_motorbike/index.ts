import { Category, GenericMotorbike, Paginated } from "@/custom"
import { Axios } from "@/utils/Axios"

type UpserGenericMotorbikeImageDto = {
	imageResourceId: number
	isGallery: boolean
}

export type UpsertGenericMotorbikeDto = {
	category: Category
	model: string
	name: string
	recommendedPrice: number
	description: string
	engineSpecs: Record<string, string>
	chassisSpecs: Record<string, string>
	warrantySpecs: Record<string, string>
	images: UpserGenericMotorbikeImageDto[]
}

type FilterGenericItemDto = {
	page: number
	perPage: number
	name?: string
	category?: Category
	minPrice?: number
	maxPrice?: number
}

export function apiCreateGenericMotorbike(data: UpsertGenericMotorbikeDto) {
	return Axios.post("/generic_motorbikes", data)
}

export function apiUpdateGenericMotorbike(id: number, data: UpsertGenericMotorbikeDto) {
	return Axios.put(`/generic_motorbikes/${id}`, data)
}

export function apiDeleteGenericMotorbike(id: number) {
	return Axios.delete(`/generic_motorbikes/${id}`)
}

export function apiFilterGenericMotorbike(data: FilterGenericItemDto) {
	return Axios.get<Paginated<GenericMotorbike>>("/generic_motorbikes", data)
}

export function apiFindGenericMotorbikeById(id: number) {
	return Axios.get<GenericMotorbike>(`/generic_motorbikes/${id}`)
}
