export namespace Db {
	export enum Category {
		STROKE = "STROKE",
		SCOOTER = "SCOOTER",
		HEAVYBIKE = "HEAVYBIKE",
	}

	export enum ResourceType {
		IMAGE = "IMAGE",
		VIDEO = "VIDEO",
	}

	// export interface Staff {
	//   id: string
	//   name: string
	//   email: string
	//   password: string
	// }

	export interface Resource {
		id: string
		url: string
		name: string
		created_at: string
		type: ResourceType
	}

	export interface Model {
		id: string
		name: string
		description: string
	}

	export interface MotorbikeDetails {
		id: string
		title: string
		detail: string
		resource_id: string | null
		motorbike_id: string
	}

	export interface MotorBikePictures {
		resource_id: string
		motorbike_id: string
	}

	export interface Motorbike {
		id: string
		name: string
		category: Category
		model_id: string
		recommended_price: string
		description: string
		color: string
		colorInHex: string
		engineSpecs: Record<string, string>
		chassisSpecs: Record<string, string>
		sizeSpecs: Record<string, string>
		warrantySpecs: Record<string, string>
	}

	export interface Post {
		id: string
		title: string
		thumbnail_resource_id: string
		author_id: string
		content: string
		created_at: string
		modified_at: string
		views: number
	}
}
