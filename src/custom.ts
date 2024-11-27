enum Category {
	SCOOTER = "SCOOTER",
	HEAVY = "HEAVY",
	STROKE = "STROKE",
}

enum CouponType {
	PERCENTAGE = "PERCENTAGE",
	FIXED = "FIXED",
	ITEM = "ITEM",
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
	genericMotorbike: GenericMotorbike
	plateNumber?: string
	odometer: number
	soldAt?: Date
	serviceTokens?: ServiceToken[]
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
	customer: User
	customerId: number
	customerName: string
	customerPhone: string
	customerAddress: string
	customerEmail: string
	paypalOrderId: string
	couponId?: number
	coupon?: Coupon
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

interface Post {
	id: number
	title: string
	content: string
	isPublished: boolean
	thumbnailResourceId: number
	createdAt: Date
	updatedAt: Date
	thumbnailResource: ImageResource
	excerpt: string
}

interface User {
	id: number
	email: string
	phoneNumber: string
	name: string
}

interface ServiceToken {
	id: number
	motorbikeId: number
	minMonth: number
	maxMonth: number
	maxOdometer: number
	isEligible: boolean
	usedAt?: Date
	createdAt: Date
	motorbike: Motorbike
}

interface ServiceAppointment {
	id: number
	serviceTokenId: number
	date: Date
	cancelledAt?: Date
	completedAt?: Date
	createdAt: Date
	serviceToken: ServiceToken
}

interface Coupon {
	id: number
	code: string
	discount: number
	type: CouponType
	itemImageResourceId?: number
	itemName?: string
	createdAt: Date
	expiredAt?: Date // Added
	maxUsage?: number // Added
	isPublished: boolean // Added
	itemImageResource: ImageResource
	orders?: Order[] // Added
}

export { Category, OrderStatus, CouponType }
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
	Post,
	User,
	ServiceToken,
	ServiceAppointment,
	Coupon,
}
