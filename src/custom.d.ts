namespace Db {
	export enum Category {
		STROKE = "STROKE",
		SCOOTER = "SCOOTER",
		HEAVYBIKE = "HEAVYBIKE",
	}

	export interface Resource {
		id: string
		url: string
		name: string
		created_at: string
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

	export namespace Response {
		export type PostItem = Omit<Post, "content"> & { thumbnail: Resource }
		export type PostDetail = Post & { thumbnail: Resource }
	}
}

export type { Db }
