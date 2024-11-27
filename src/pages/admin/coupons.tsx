import useCoupon from "@/hooks/zustand/useCoupon"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function AdminCouponPage() {
	const {
		coupons,
		page,
		perPage,
		total,
		totalPages,
		setPage,
		filters,
		setFilters,
		paginateCoupons,
		publishCoupon,
		deleteCoupon,
	} = useCoupon()
	const navigate = useNavigate()

	useEffect(() => {
		paginateCoupons()
	}, [JSON.stringify(filters)])

	useEffect(() => {
		paginateCoupons()
	}, [])

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Posts</h1>
				<Link
					to="/admin/coupons/create"
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
				>
					Create a Coupon
				</Link>
			</div>
			<div className="mb-6 flex gap-6">
				<div className="flex flex-col gap-2">
					<label htmlFor="search" className="font-medium">
						Search by code
					</label>
					<input
						id="search"
						type="text"
						placeholder="Enter title..."
						onChange={(e) => setFilters({ ...filters, code: e.target.value })}
						className="border p-2 rounded w-full max-w-md"
					/>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full border-collapse bg-white shadow-sm rounded-lg">
					<thead className="bg-gray-50">
						<tr>
							<th className="p-4 text-left">ID</th>
							<th className="p-4 text-left">Code</th>
							<th className="p-4 text-left">Type</th>
							<th className="p-4 text-left">Created At</th>
							<th className="p-4 text-left">Expired At</th>
							<th className="p-4 text-left">Max Usage</th>
							<th className="p-4 text-left">Published</th>
							<th className="p-4 text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{coupons.map((coupon) => (
							<tr key={coupon.id} className="border-t hover:bg-gray-50">
								<td className="p-4">{coupon.id}</td>
								<td className="p-4">{coupon.code}</td>
								<td className="p-4">{coupon.type}</td>
								<td className="p-4">
									{new Date(coupon.createdAt).toLocaleDateString()}
								</td>
								<td className="p-4">
									{coupon.expiredAt
										? new Date(coupon.expiredAt).toLocaleDateString()
										: "No expiration"}
								</td>
								<td className="p-4">{coupon.maxUsage}</td>
								<td className="p-4">
									{coupon.isPublished ? "Published" : "Draft"}
								</td>
								<td className="p-4">
									<div className="flex gap-2">
										<button
											onClick={() =>
												navigate(`/admin/coupons/${coupon.code}`)
											}
											className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
										>
											Edit
										</button>
										<button
											onClick={() =>
												publishCoupon(
													coupon.id,
													!coupon.isPublished
												).then(() => paginateCoupons())
											}
											className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
										>
											{coupon.isPublished ? "Unpublish" : "Publish"}
										</button>
										<button
											onClick={() =>
												window.confirm(
													`Are you sure you want to delete this coupon with code "${coupon.code}"?`
												) &&
												deleteCoupon(coupon.id).then(() =>
													paginateCoupons()
												)
											}
											className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="mt-8 flex justify-between items-center">
				<p className="text-sm text-gray-600">
					Showing {(page - 1) * perPage + 1} to{" "}
					{Math.min(page * perPage, total)} of {total} results
				</p>
				<div className="flex space-x-2">
					<button
						onClick={() => setPage(page - 1)}
						disabled={page === 1}
						className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
					>
						Previous
					</button>
					<button
						onClick={() => setPage(page + 1)}
						disabled={page >= totalPages}
						className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminCouponPage
