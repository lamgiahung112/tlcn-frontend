import useServiceToken from "@/hooks/zustand/useServiceToken"
import { useEffect } from "react"

function AdminServiceTokenPage() {
	const {
		serviceTokens,
		adminPaginate,
		page,
		perPage,
		totalPages,
		total,
		filter,
		setFilter,
		markUsed,
		setPage,
	} = useServiceToken()

	useEffect(() => {
		adminPaginate()
	}, [])

	useEffect(() => {
		adminPaginate()
	}, [page, JSON.stringify(filter)])

	const handlePageChange = (pageNum: number) => {
		setPage(pageNum)
	}

	return (
		<div className="container px-4 w-full py-6 space-y-6">
			<h1 className="text-2xl font-bold">Service Tokens</h1>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				<input
					type="text"
					placeholder="Biển số xe"
					value={filter.plateNumber}
					onChange={(e) =>
						setFilter({ ...filter, plateNumber: e.target.value })
					}
					className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				/>
				<select
					value={filter.status}
					onChange={(e) =>
						setFilter({
							...filter,
							status: e.target.value as "USED" | "UNUSED",
						})
					}
					className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="">Tất cả</option>
					<option value="USED">Đã sử dụng</option>
					<option value="UNUSED">Chưa sử dụng</option>
				</select>
			</div>

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
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Thời hạn
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Số km tối đa
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Tháng sử dụng
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Số km hiện tại
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Hành động
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
									{tk.usedAt && new Date(tk.usedAt).toLocaleString()}
									{!tk.usedAt && "N/A"}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									Tháng thứ {tk.minMonth} đến tháng thứ {tk.maxMonth}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{tk.maxOdometer.toLocaleString()}km
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{tk.motorbike.soldAt &&
										Math.ceil(
											(new Date().getTime() -
												new Date(
													tk.motorbike.soldAt ?? 0
												).getTime()) /
												(1000 * 60 * 60 * 24 * 7)
										)}
									{!tk.motorbike.soldAt && "N/A"}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{tk.motorbike.odometer?.toLocaleString() ?? "N/A"}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
									{tk.isEligible && (
										<button
											onClick={() => {
												markUsed(tk.id).then(adminPaginate)
											}}
											className="bg-blue-500 text-white px-4 py-2 rounded-md"
										>
											Sử dụng
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="mt-6 flex justify-between items-center">
				<div>
					Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, total)}{" "}
					of {total} items
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
	)
}

export default AdminServiceTokenPage
