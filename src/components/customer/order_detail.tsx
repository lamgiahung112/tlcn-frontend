import { OrderCartItem, OrderItem, OrderStatus } from "@/custom"
import { useOrder } from "@/hooks/zustand/useOrder"
import { _currency } from "@/utils/format"
import { _imgLink } from "@/utils/img-link"
import { BsCheck2Circle, BsCircle } from "react-icons/bs"

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

function ChargeSummary() {
	const { currentOrder } = useOrder()

	if (!currentOrder) {
		return <></>
	}

	return (
		<div className="bg-gray-50 p-6 rounded-lg">
			<h3 className="text-lg font-medium text-gray-900 mb-4">Charge Summary</h3>
			<div className="space-y-3">
				<div className="flex justify-between">
					<span className="text-gray-600">Total</span>
					<span>{_currency(currentOrder.total)}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-600">Transaction ID</span>
					<span>{currentOrder.charge?.transaction_id}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-600">Paid at</span>
					<span>
						{new Date(currentOrder.charge?.createdAt).toLocaleString()}
					</span>
				</div>
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

function OrderDetail() {
	const { currentOrder } = useOrder()

	if (!currentOrder) {
		return <></>
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="space-y-8">
				{/* Title and Order ID */}
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900">Order Detail</h1>
					<p className="text-gray-500 mt-2">
						Order ID: {currentOrder.publicOrderId}
					</p>
				</div>

				{/* Progress Tracker */}
				<OrderStatusProgress status={currentOrder.status} />

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
					</div>

					{/* Order Summary */}
					<div className="mt-6 border-t pt-4">
						<div className="flex justify-between mt-2 text-lg font-bold">
							<span>Total</span>
							<span>{_currency(currentOrder.total)}</span>
						</div>
					</div>
				</div>

				<ChargeSummary />
				{/* Customer Information */}
				<CustomerInfo />
			</div>
		</div>
	)
}

export default OrderDetail
