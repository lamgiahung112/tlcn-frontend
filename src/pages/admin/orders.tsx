import { OrderStatus } from "@/custom"
import { useOrder } from "@/hooks/zustand/useOrder"
import { _currency } from "@/utils/format"
import { useState } from "react"

function AdminOrdersPage() {
	const orders = useOrder((state) => state.orders)
	const [filters, setFilters] = useState({
		orderId: "",
		status: "",
	})

	return (
		<div className="container px-4 w-full py-6 space-y-6">
			<h1 className="text-2xl font-bold">Orders</h1>

			{/* Filters */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<input
					type="text"
					placeholder="Order ID"
					value={filters.orderId}
					onChange={(e) => setFilters({ ...filters, orderId: e.target.value })}
					className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				/>
				<select
					value={filters.status}
					onChange={(e) => setFilters({ ...filters, status: e.target.value })}
					className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="">All Status</option>
					{Object.values(OrderStatus).map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>

			{/* Table */}
			<div className="rounded-md border">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Public Order ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Total
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Created At
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Customer Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Customer Phone
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{orders?.map((order) => (
							<tr key={order.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.id}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.publicOrderId}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm">
									<span
										className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
											order.status
										)}`}
									>
										{order.status}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{_currency(order.total)}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{new Date(order.createdAt).toISOString()}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.customerName}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{order.customerPhone}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

// Helper function to get status color
function getStatusColor(status: OrderStatus) {
	switch (status) {
		case OrderStatus.CREATED:
			return "bg-blue-100 text-blue-800"
		case OrderStatus.CONFIRMED:
			return "bg-green-100 text-green-800"
		case OrderStatus.DELIVERY_STARTED:
			return "bg-yellow-100 text-yellow-800"
		case OrderStatus.COMPLETED:
			return "bg-green-100 text-green-800"
		case OrderStatus.CANCELLED:
			return "bg-red-100 text-red-800"
		default:
			return "bg-gray-100 text-gray-800"
	}
}

export default AdminOrdersPage
