import { CouponType, OrderCartItem, OrderItem, OrderStatus } from "@/custom"
import { useOrder } from "@/hooks/zustand/useOrder"
import { _currency } from "@/utils/format"
import { _imgLink } from "@/utils/img-link"
import { useEffect } from "react"
import { BsCheck2Circle, BsCircle } from "react-icons/bs"
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"

function OrderStatusProgress({ status }: { status: OrderStatus }) {
	const steps = [
		{ label: "Order Placed", value: OrderStatus.CREATED },
		{ label: "Confirmed", value: OrderStatus.CONFIRMED },
		{ label: "Delivery Started", value: OrderStatus.DELIVERY_STARTED },
		{ label: "Completed", value: OrderStatus.COMPLETED },
		{ label: "Cancelled", value: OrderStatus.CANCELLED },
	]

	const getCurrentStep = () => {
		return steps.findIndex((step) => step.value === status)
	}

	const isCancelled = status === OrderStatus.CANCELLED

	return (
		<div className="w-full py-6">
			<div className="flex items-center justify-center">
				{steps.map((step, index) => (
					<div key={index} className="flex items-center">
						<div className="flex flex-col items-center">
							{isCancelled ? (
								<BsCircle className="w-8 h-8 text-red-500" />
							) : getCurrentStep() >= index ? (
								<BsCheck2Circle className="w-8 h-8 text-green-500" />
							) : (
								<BsCircle className="w-8 h-8 text-gray-300" />
							)}
							<span className="mt-2 text-sm text-gray-600">
								{step.label}
							</span>
						</div>
						{index < steps.length - 1 && (
							<div
								className={`h-1 w-20 mx-2 ${
									isCancelled
										? "bg-red-500"
										: getCurrentStep() > index
										? "bg-green-500"
										: "bg-gray-300"
								}`}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

function OrderStatusHistory() {
	const { currentOrder } = useOrder()

	if (!currentOrder) {
		return <></>
	}
	const statusEvents = [
		{
			status: "Order Placed",
			date: currentOrder.createdAt,
			icon: "🛍️",
		},
		...(currentOrder.confirmedAt
			? [
					{
						status: "Order Confirmed",
						date: currentOrder.confirmedAt,
						icon: "✅",
					},
			  ]
			: []),
		...(currentOrder.startedDeliveryAt
			? [
					{
						status: "Delivery Started",
						date: currentOrder.startedDeliveryAt,
						icon: "🚚",
					},
			  ]
			: []),
		...(currentOrder.completedAt
			? [
					{
						status: "Order Completed",
						date: currentOrder.completedAt,
						icon: "🎉",
					},
			  ]
			: []),
		...(currentOrder.cancelledAt
			? [
					{
						status: `Order Cancelled: ${currentOrder.cancelReason}`,
						date: currentOrder.cancelledAt,
						icon: "❌",
					},
			  ]
			: []),
	].filter((event) => event.date)

	return (
		<div className="bg-gray-50 p-6 rounded-lg">
			<h3 className="text-lg font-medium text-gray-900 mb-4">Order Timeline</h3>
			<div className="space-y-4">
				{statusEvents.map((event, index) => (
					<div key={index} className="flex items-start">
						<div className="flex-shrink-0 w-8">{event.icon}</div>
						<div className="ml-4">
							<p className="font-medium text-gray-900">{event.status}</p>
							<p className="text-sm text-gray-500">
								{new Date(event.date).toLocaleString()}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

function CartItem({ items, cartItem }: { cartItem: OrderCartItem; items: OrderItem[] }) {
	return (
		<div className="flex items-center py-4 border-b">
			<img
				src={_imgLink(
					cartItem?.genericMotorbike?.images[0]?.imageResource?.s3Key
				)}
				alt="img motorbike"
				className="w-20 h-20 object-cover rounded-lg"
			/>
			<div className="ml-4 flex-1">
				<h3 className="font-medium text-gray-900">
					{cartItem?.genericMotorbike?.name}
				</h3>
				<p className="text-gray-500">Quantity: {items?.length}</p>
				<p className="text-gray-500">
					{_currency(items?.reduce((acc, i) => acc + i?.motorbike?.price, 0))}
				</p>
			</div>
		</div>
	)
}

function CustomerInfo() {
	const { currentOrder } = useOrder()

	if (!currentOrder) {
		return <></>
	}

	return (
		<div className="bg-gray-50 p-6 rounded-lg">
			<h3 className="text-lg font-medium text-gray-900 mb-4">
				Customer Information
			</h3>
			<div className="space-y-2">
				<p>
					<span className="font-medium">Name:</span> {currentOrder.customerName}
				</p>
				<p>
					<span className="font-medium">Email:</span>{" "}
					{currentOrder.customerEmail}
				</p>
				<p>
					<span className="font-medium">Phone:</span>{" "}
					{currentOrder.customerPhone}
				</p>
				<p>
					<span className="font-medium">Address:</span>{" "}
					{currentOrder.customerAddress}
				</p>
			</div>
		</div>
	)
}

function UserOrderDetailPage() {
	const { currentOrder, getAdminOrder } = useOrder()
	const { orderPublicId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (orderPublicId) {
			getAdminOrder(orderPublicId)
		}
	}, [orderPublicId])

	if (!currentOrder) {
		return <></>
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="space-y-8">
				<div
					className="flex items-center gap-2 cursor-pointer"
					onClick={() => navigate(-1)}
				>
					<FaChevronLeft />
					<span>Back to Orders</span>
				</div>
				{/* Title and Order ID */}
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900">Order Detail</h1>
					<p className="text-gray-500 mt-2">
						Order ID: {currentOrder.publicOrderId}
					</p>
				</div>

				{/* Progress Tracker */}
				<OrderStatusProgress status={currentOrder.status} />
				<OrderStatusHistory />

				{/* Order Items */}
				<div className="bg-white rounded-lg shadow p-6">
					<h2 className="text-xl font-semibold mb-4">Motorbikes</h2>
					<div className="space-y-4">
						{currentOrder.orderCartItems.map((item) => (
							<CartItem
								key={item.id}
								cartItem={item}
								items={currentOrder.orderItems.filter(
									(i) =>
										i.motorbike.genericMotorbikeId ===
										item.genericMotorbike.id
								)}
							/>
						))}
						{currentOrder &&
							currentOrder.coupon &&
							currentOrder.coupon.type === CouponType.ITEM && (
								<div className="flex items-center py-4 border-b">
									<img
										src={_imgLink(
											currentOrder.coupon?.itemImageResource
												?.s3Key ?? ""
										)}
										alt="img motorbike"
										className="w-20 h-20 object-cover rounded-lg"
									/>
									<div className="ml-4 flex-1">
										<h3 className="font-medium text-gray-900">
											{currentOrder.coupon?.itemName}
										</h3>
									</div>
								</div>
							)}
					</div>

					{/* Order Summary */}
					<div className="mt-6 border-t pt-4">
						<div className="flex justify-between mt-2 text-lg font-bold">
							<span>Total</span>
							<span>{_currency(currentOrder.total)}</span>
						</div>
						<div className="flex justify-between mt-2 text-lg font-bold">
							<span>Paid via</span>
							<span className="font-normal">Paypal</span>
						</div>
						<div className="flex justify-between mt-2 text-lg font-bold">
							<span>Paypal Order ID</span>
							<span className="font-normal">
								{currentOrder.paypalOrderId}
							</span>
						</div>
						<div className="flex justify-between mt-2 text-lg font-bold">
							<span>Applied Coupon</span>
							<span className="font-normal">
								{currentOrder.coupon?.code}
							</span>
						</div>
					</div>
				</div>
				{/* Customer Information */}
				<CustomerInfo />
			</div>
		</div>
	)
}

export default UserOrderDetailPage
