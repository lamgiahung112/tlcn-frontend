import { OrderCartItem, OrderItem, OrderStatus } from "@/custom"
import { useOrder } from "@/hooks/zustand/useOrder"
import { _currency } from "@/utils/format"
import { _imgLink } from "@/utils/img-link"
import { useState } from "react"
import { BsCheck2Circle, BsCircle } from "react-icons/bs"
import { FaChevronLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

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
            status: 'Order Placed',
            date: currentOrder.createdAt,
            icon: '🛍️'
        },
        ...(currentOrder.confirmedAt ? [{
            status: 'Order Confirmed',
            date: currentOrder.confirmedAt,
            icon: '✅'
        }] : []),
        ...(currentOrder.startedDeliveryAt ? [{
            status: 'Delivery Started',
            date: currentOrder.startedDeliveryAt,
            icon: '🚚'
        }] : []),
        ...(currentOrder.completedAt ? [{
            status: 'Order Completed',
            date: currentOrder.completedAt,
            icon: '🎉'
        }] : []),
        ...(currentOrder.cancelledAt ? [{
            status: `Order Cancelled: ${currentOrder.cancelReason}`,
            date: currentOrder.cancelledAt,
            icon: '❌'
        }] : [])
    ].filter(event => event.date)

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
	// add something that shows the engine code and chassis code of the motorbike
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
			<div className="mt-3 ml-24">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Motorbike Details:</h4>
                <div className="grid grid-cols-2 gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="text-sm text-gray-600">
                            <p>Engine Code: {item.motorbike.engineCode}</p>
                            <p>Chassis Code: {item.motorbike.chassisCode}</p>
                        </div>
                    ))}
                </div>
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

function OrderActions() {
    const { currentOrder, confirmOrder, startDelivery, completeOrder, cancelOrder } = useOrder()
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isDeliverModalOpen, setIsDeliverModalOpen] = useState(false)
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
    const [cancelReason, setCancelReason] = useState('')

    if (!currentOrder) return null

    const handleConfirm = async () => {
        await confirmOrder(currentOrder.publicOrderId)
        setIsConfirmModalOpen(false)
    }

    const handleDeliver = async () => {
        await startDelivery(currentOrder.publicOrderId)
        setIsDeliverModalOpen(false)
    }

    const handleComplete = async () => {
        await completeOrder(currentOrder.publicOrderId)
        setIsCompleteModalOpen(false)
    }

    const handleCancel = async () => {
        if (!cancelReason.trim()) return
        await cancelOrder(currentOrder.publicOrderId, cancelReason)
        setIsCancelModalOpen(false)
        setCancelReason('')
    }

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Actions</h3>
                <div className="flex gap-4">
                    {currentOrder.status === OrderStatus.CREATED && (
                        <>
                            <button
                                onClick={() => setIsConfirmModalOpen(true)}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Confirm Order
                            </button>
                            <button
                                onClick={() => setIsCancelModalOpen(true)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Cancel Order
                            </button>
                        </>
                    )}
                    {currentOrder.status === OrderStatus.CONFIRMED && (
                        <button
                            onClick={() => setIsDeliverModalOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Start Delivery
                        </button>
                    )}
                    {currentOrder.status === OrderStatus.DELIVERY_STARTED && (
                        <button
                            onClick={() => setIsCompleteModalOpen(true)}
                            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                        >
                            Complete Order
                        </button>
                    )}
                </div>
            </div>

            {/* Confirm Modal */}
            {isConfirmModalOpen && (
                <div className="fixed inset-0 top-[-64px] bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium mb-4">Confirm Order</h3>
                        <p>Are you sure you want to confirm this order?</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={() => setIsConfirmModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Deliver Modal */}
            {isDeliverModalOpen && (
                <div className="fixed inset-0 top-[-64px] bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium mb-4">Start Delivery</h3>
                        <p>Are you sure you want to start delivery for this order?</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={() => setIsDeliverModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeliver}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Start Delivery
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Complete Modal */}
            {isCompleteModalOpen && (
                <div className="fixed inset-0 top-[-64px] bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium mb-4">Complete Order</h3>
                        <p>Are you sure you want to mark this order as completed?</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={() => setIsCompleteModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleComplete}
                                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                                Complete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Modal */}
            {isCancelModalOpen && (
                <div className="fixed inset-0 top-[-64px] bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium mb-4">Cancel Order</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Cancellation Reason
                            </label>
                            <textarea
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                                className="w-full p-2 border rounded"
                                rows={3}
                                placeholder="Enter reason for cancellation..."
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setIsCancelModalOpen(false)
                                    setCancelReason('')
                                }}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                disabled={!cancelReason.trim()}
                            >
                                Confirm Cancellation
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

function AdminOrderDetail() {
	const { currentOrder } = useOrder()

	if (!currentOrder) {
		return <></>
	}

	return (
		<div className="w-full px-4 py-8">
            <div className="flex flex-col gap-4">
				<Link to="/admin/orders" className="flex items-center gap-2">
					<FaChevronLeft />
					<span>Back to List</span>
				</Link>
			</div>
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
				<OrderActions />

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

export default AdminOrderDetail
