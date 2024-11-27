import useUser from "@/hooks/zustand/useUser"
import { useEffect } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { _imgLink } from "@/utils/img-link"
import { useOrder } from "@/hooks/zustand/useOrder"
import { OrderStatus } from "@/custom"
import { _currency } from "@/utils/format"
import useServiceToken from "@/hooks/zustand/useServiceToken"

function UserDashboardPage() {
	const { motorbikes, getUserMotorbikes, user } = useUser()
	const {
		orders,
		paginate,
		filter,
		setFilter,
		page,
		perPage,
		total,
		totalPages,
		setPage,
	} = useOrder()
	const {
		serviceTokens,
		total: totalServiceToken,
		page: pageServiceToken,
		perPage: perPageServiceToken,
		totalPages: totalPagesServiceToken,
		paginate: paginateServiceToken,
		setPage: setPageServiceToken,
	} = useServiceToken()
	const navigate = useNavigate()

	useEffect(() => {
		getUserMotorbikes()
		paginate()
		paginateServiceToken()
	}, [])

	useEffect(() => {
		paginate()
	}, [JSON.stringify(filter), page])

	useEffect(() => {
		paginateServiceToken()
	}, [pageServiceToken])

	if (!user) {
		return <Navigate to="/login" replace />
	}

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
		paginate()
	}

	const handlePageChangeServiceToken = (newPage: number) => {
		setPageServiceToken(newPage)
		paginateServiceToken()
	}

	const sliderSettings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	}

	return (
		<div className="flex flex-col gap-8">
			<div>
				<h2 className="text-2xl font-bold mb-6">Xe của tôi</h2>
				{motorbikes && motorbikes.length > 0 ? (
					<Slider {...sliderSettings} className="mb-8">
						{motorbikes.map((motorbike) => {
							const mainImage = motorbike.genericMotorbike.images[0]
							return (
								<div key={motorbike.id} className="px-2">
									<Link
										to={`/user/motorbikes/${motorbike.id}`}
										className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
									>
										<div className="aspect-w-16 aspect-h-9">
											<img
												src={_imgLink(
													mainImage.imageResource.s3Key
												)}
												alt={motorbike.genericMotorbike.name}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="p-4">
											<h3 className="font-semibold text-lg mb-2">
												{motorbike.genericMotorbike.name}
											</h3>
											<p className="text-gray-600 text-sm">
												Chassis: {motorbike.chassisCode || "N/A"}
											</p>
											<p className="text-gray-600 text-sm">
												Engine: {motorbike.engineCode || "N/A"}
											</p>
											<p className="text-gray-600 text-sm">
												Plate: {motorbike.plateNumber || "N/A"}
											</p>
										</div>
									</Link>
								</div>
							)
						})}
					</Slider>
				) : (
					<div className="text-center py-8 text-gray-500">
						No motorbikes found
					</div>
				)}
			</div>
			<div className="container px-4 w-full py-6 space-y-6">
				<h2 className="text-2xl font-bold mb-6">
					Thông tin cá nhân
				</h2>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<span className="font-semibold">Họ tên:</span>
						<span>{user.name}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="font-semibold">Email:</span>
						<span>{user.email}</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="font-semibold">Số điện thoại:</span>
						<span>{user.phoneNumber}</span>
					</div>
				</div>
			</div>
			<div className="container px-4 w-full py-6 space-y-6">
				<h2 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h2>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<input
						type="text"
						placeholder="Order ID"
						value={filter.publicOrderId}
						onChange={(e) =>
							setFilter({ ...filter, publicOrderId: e.target.value })
						}
						className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<select
						value={filter.status}
						onChange={(e) =>
							setFilter({
								...filter,
								status: (e.target.value as OrderStatus) ?? undefined,
							})
						}
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
								<tr
									onClick={() =>
										navigate(`/user/orders/${order.publicOrderId}`)
									}
									key={order.id}
									className="hover:bg-gray-50 cursor-pointer"
								>
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
										{new Date(order.createdAt).toLocaleString()}
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
				<div className="mt-6 flex justify-between items-center">
					<div>
						Showing {(page - 1) * perPage + 1} -{" "}
						{Math.min(page * perPage, total)} of {total} items
					</div>
					<div className="space-x-2">
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(pageNum) => (
								<button
									key={pageNum}
									onClick={() => handlePageChange(pageNum)}
									className={`px-3 py-1 rounded ${
										pageNum === page
											? "bg-blue-500 text-white"
											: "bg-gray-200"
									}`}
								>
									{pageNum}
								</button>
							)
						)}
					</div>
				</div>
			</div>

			<div className="container px-4 w-full py-6 space-y-6">
				<h2 className="text-2xl font-bold mb-6">Lịch sử bảo hành xe miễn phí</h2>

				{/* Table */}
				<div className="rounded-md border">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Mã phiếu bảo hành
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Biển số xe
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Ngày sử dụng
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{serviceTokens?.map((tk) => (
								<tr key={tk.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{tk.id}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										{tk.motorbike.plateNumber}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{new Date(tk.usedAt ?? 0).toLocaleString() ??
											"N/A"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-6 flex justify-between items-center">
					<div>
						Showing {(pageServiceToken - 1) * perPageServiceToken + 1} -{" "}
						{Math.min(
							pageServiceToken * perPageServiceToken,
							totalServiceToken
						)}{" "}
						of {totalServiceToken} items
					</div>
					<div className="space-x-2">
						{Array.from(
							{ length: totalPagesServiceToken },
							(_, i) => i + 1
						).map((pageNum) => (
							<button
								key={pageNum}
								onClick={() => handlePageChangeServiceToken(pageNum)}
								className={`px-3 py-1 rounded ${
									pageNum === pageServiceToken
										? "bg-blue-500 text-white"
										: "bg-gray-200"
								}`}
							>
								{pageNum}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

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

export default UserDashboardPage
