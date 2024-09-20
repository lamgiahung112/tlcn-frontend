import { Db } from "@/custom"
import { Axios } from "@/utils/Axios"

interface UpdateMotorbikeRequest {
	name: string
	category: "SCOOTER" | "STROKE" | "HEAVY"
	modelId: string
	recommendedPrice: number
	description: string
	engineSpecs: Record<string, string>
	chassisSpecs: Record<string, string>
	sizeSpecs: Record<string, string>
	warrantySpecs: Record<string, string>
	gallery: string[]
	detail: UpdateMotorbikeDetailRequest[]
	variants: UpdateMotorbikeVariantRequest[]
}

interface UpdateMotorbikeDetailRequest {
	id?: string
	title: string
	detail: string
	resource_id?: string
}

interface UpdateMotorbikeVariantRequest {
	id?: string
	color_id: string
	displayPictures: string[]
}

function addMotorbike(data: UpdateMotorbikeRequest) {
	return Axios.post("/motorbikes", data)
}

function getMotorbikeList(): Promise<Db.Motorbike[]> {
	return Axios.get("/motorbikes", { page: 1, size: 10 })
}

export { addMotorbike, getMotorbikeList }
