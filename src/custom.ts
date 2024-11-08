enum Category {
	SCOOTER = "SCOOTER",
	HEAVY = "HEAVY",
	STROKE = "STROKE",
}

enum OrderStatus {
	CREATED = "CREATED",
	CANCELLED = "CANCELLED",
	CONFIRMED = "CONFIRMED",
	DELIVERY_STARTED = "DELIVERY_STARTED",
	COMPLETED = "COMPLETED",
}

interface ImageResource {
	id: number
	filename: string
	s3Key: string
	createdAt: Date
}

interface GenericMotorbike {
	id: number
	category: Category
	model: string
	name: string
	recommendedPrice: number
	description?: string
	colorInHex?: string
	colorName?: string
	engineSpecs?: Record<string, any>
	chassisSpecs?: Record<string, any>
	warrantySpecs?: Record<string, any>
	isAvailable: boolean
	createdAt: Date
	updatedAt: Date
	images: GenericMotorbikeImage[]
	motorbikes?: Motorbike[]
}

interface GenericMotorbikeImage {
	id: number
	genericMotorbikeId: number
	imageResourceId: number
	isGallery: boolean
	createdAt: Date
	imageResource: ImageResource
}

interface Motorbike {
	id: number
	genericMotorbikeId: number
	chassisCode?: string
	engineCode?: string
	price: number
	arrivedToInventoryAt?: Date
	isSold: boolean
	createdAt: Date
	updatedAt: Date
}

interface Order {
	id: number
	publicOrderId: string
	status: OrderStatus
	total: number
	cancelReason?: string
	createdAt: Date
	confirmedAt?: Date
	startedDeliveryAt?: Date
	completedAt?: Date
	cancelledAt?: Date
	customerName: string
	customerPhone: string
	customerAddress: string
	customerEmail: string
	paypalOrderId: string
	orderItems: OrderItem[]
	orderCartItems: OrderCartItem[]
}

interface OrderItem {
	id: number
	orderId: number
	motorbikeId: number
	motorbike: Motorbike
	createdAt: Date
}

interface OrderCartItem {
	id: number
	orderId: number
	genericMotorbikeId: number
	quantity: number
	createdAt: Date
	genericMotorbike: GenericMotorbike
}

interface Paginated<T> {
	items: T[]
	meta: {
		total: number
		page: number
		perPage: number
		totalPages: number
	}
}

interface CartItemDetail {
	item: {
		id: number
		name: string
		color: string
		price: number
		image: string
	}
	quantity: number
}

export { Category, OrderStatus }
export type {
	GenericMotorbike,
	Motorbike,
	Order,
	OrderItem,
	OrderCartItem,
	Paginated,
	GenericMotorbikeImage,
	ImageResource,
	CartItemDetail,
}
