import { Db } from "@/custom"
import { Axios } from "@/utils/Axios"

type UpserGenericMotorbikeImageDto = {
	id?: number
	imageResourceId: number
	isGallery: boolean
}

type UpserGenericMotorbikeDetailDto = {
	id?: number
	imageResourceId: number
	title: string
	excerpt: string
}

type UpsertGenericMotorbikeDto = {
	id?: number
	category: Db.Category
	model: string
	name: string
	recommendedPrice: number
	description: string
	engineSpecs: Record<string, string>
	chassisSpecs: Record<string, string>
	warrantySpecs: Record<string, string>
	images: UpserGenericMotorbikeImageDto[]
	details: UpserGenericMotorbikeDetailDto[]
}

type FilterGenericItemDto = {
	page: number
	perPage: number
	name?: string
	category?: Db.Category
	minPrice?: number
	maxPrice?: number
}

export function apiCreateGenericMotorbike(data: UpsertGenericMotorbikeDto) {
	return Axios.post("/generic_motorbikes", data)
}

export function apiUpdateGenericMotorbike(data: UpsertGenericMotorbikeDto) {
	return Axios.put(`/generic_motorbikes/${data.id}`, data)
}

export function apiDeleteGenericMotorbike(id: number) {
	return Axios.delete(`/generic_motorbikes/${id}`)
}

export function apiFilterGenericMotorbike(data: FilterGenericItemDto) {
	return Axios.get<Db.Paginated<Db.GenericMotorbike>>("/generic_motorbikes", data)
}
