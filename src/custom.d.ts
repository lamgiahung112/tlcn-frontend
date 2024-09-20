namespace Db {
	export type Category = "STROKE" | "SCOOTER" | "HEAVY"

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
		recommended_price: number
		description: string
		engineSpecs: Record<string, any>
		chassisSpecs: Record<string, any>
		sizeSpecs: Record<string, any>
		warrantySpecs: Record<string, any>
	}

	export interface MotorbikeVariant {
		id: string
		motorbike_id: string
		color_id: string
	}

	export interface Color {
		id: string
		name: string
		hex: string
	}

	export interface VariantDisplayPicture {
		resource_id: string
		variant_id: string
	}

	export interface Post {
		id: string
		title: string
		thumbnail_resource_id: string
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
