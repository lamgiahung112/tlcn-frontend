import ImageResourcePicker from "@/components/admin/image_resource_picker"
import { CouponType, ImageResource } from "@/custom"
import useCoupon from "@/hooks/zustand/useCoupon"
import { _imgLink } from "@/utils/img-link"
import { useEffect, useState } from "react"
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"

function AdminCouponDetailPage() {
	const { code } = useParams()
	const { getCoupon, currentCoupon, updateCoupon } = useCoupon()
	const [cCode, setCCode] = useState("")
	const [type, setType] = useState<CouponType>(CouponType.PERCENTAGE)
	const [maxUses, setMaxUses] = useState(0)
	const [discount, setDiscount] = useState(0)
	const [expiryDate, setExpiryDate] = useState("")
	const [isImagePickerOpen, setIsImagePickerOpen] = useState(false)
	const [imageResource, setImageResource] = useState<ImageResource | undefined>(
		undefined
	)
	const [itemName, setItemName] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		if (!code) return
		getCoupon(code)
	}, [])

	useEffect(() => {
		if (!currentCoupon) return
		console.log(currentCoupon.expiredAt)
		setCCode(currentCoupon.code)
		setType(currentCoupon.type)
		setMaxUses(currentCoupon.maxUsage ?? 0)
		setDiscount(currentCoupon.discount ?? 0)
		setExpiryDate(currentCoupon.expiredAt?.toString().split(".")[0] ?? "")
		setItemName(currentCoupon.itemName ?? "")
		setImageResource(currentCoupon.itemImageResource)
	}, [currentCoupon])

	function onSubmit() {
		if (!code || !type) return

		const couponData = {
			code,
			type,
			...(type === CouponType.ITEM
				? {
						itemName,
						itemImageResourceId: imageResource?.id,
				  }
				: {
						maxUsage: maxUses,
						discount,
						expiredAt: expiryDate,
				  }),
		}

		updateCoupon(currentCoupon?.id ?? 0, couponData)
			.then(() => {
				navigate("/admin/coupons")
			})
			.catch((error) => {
				window.alert(`Failed to create coupon: ${error.message}`)
			})
	}

	return (
		<div className="w-full px-4 py-8">
			{isImagePickerOpen && (
				<ImageResourcePicker
					isMultiple={false}
					onSingleResourcePick={(resource) => {
						setImageResource(resource)
						setIsImagePickerOpen(false)
					}}
					onClose={() => setIsImagePickerOpen(false)}
				/>
			)}
			<div className="mx-auto">
				<h1 className="text-3xl font-bold mb-8 flex items-center gap-x-2">
					<FaChevronLeft
						className="cursor-pointer hover:text-blue-500"
						onClick={() => navigate("/admin/coupons")}
					/>
					Coupon Detail
				</h1>

				<div className="space-y-6 mb-16">
					{/* Code Input */}
					<div className="flex flex-col gap-2">
						<label htmlFor="code" className="font-medium">
							Coupon Code
						</label>
						<input
							id="code"
							type="text"
							placeholder="Enter coupon code..."
							className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={cCode}
							onChange={(e) => setCCode(e.target.value)}
						/>
					</div>

					{/* Type Selection */}
					<div className="flex flex-col gap-2">
						<label className="font-medium">Coupon Type</label>
						<select
							value={type}
							onChange={(e) => setType(e.target.value as CouponType)}
							className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value={CouponType.PERCENTAGE}>
								Percentage Discount
							</option>
							<option value={CouponType.FIXED}>
								Fixed Amount Discount
							</option>
							<option value={CouponType.ITEM}>Free Item</option>
						</select>
					</div>

					{/* Conditional Fields based on Type */}
					{(type === CouponType.PERCENTAGE || type === CouponType.FIXED) && (
						<>
							{/* Discount Input */}
							<div className="flex flex-col gap-2">
								<label htmlFor="discount" className="font-medium">
									{type === CouponType.PERCENTAGE
										? "Discount Percentage"
										: "Discount Amount"}
								</label>
								<input
									id="discount"
									type="number"
									min="0"
									max={
										type === CouponType.PERCENTAGE ? "100" : undefined
									}
									placeholder={
										type === CouponType.PERCENTAGE
											? "Enter discount percentage..."
											: "Enter discount amount..."
									}
									className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={discount}
									onChange={(e) => setDiscount(Number(e.target.value))}
								/>
							</div>

							{/* Max Uses Input */}
							<div className="flex flex-col gap-2">
								<label htmlFor="maxUses" className="font-medium">
									Maximum Uses (0 for inifinite)
								</label>
								<input
									id="maxUses"
									type="number"
									min="1"
									placeholder="Enter maximum number of uses..."
									className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={maxUses}
									onChange={(e) => setMaxUses(Number(e.target.value))}
								/>
							</div>

							{/* Expiry Date Input */}
							<div className="flex flex-col gap-2">
								<label htmlFor="expiryDate" className="font-medium">
									Expiry Date (Clear for no expiration)
								</label>
								<input
									id="expiryDate"
									type="datetime-local"
									className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={expiryDate}
									onChange={(e) => setExpiryDate(e.target.value)}
								/>
							</div>
						</>
					)}

					{type === CouponType.ITEM && (
						<>
							{/* Item Name Input */}
							<div className="flex flex-col gap-2">
								<label htmlFor="itemName" className="font-medium">
									Item Name
								</label>
								<input
									id="itemName"
									type="text"
									placeholder="Enter item name..."
									className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={itemName}
									onChange={(e) => setItemName(e.target.value)}
								/>
							</div>

							{/* Item Image Selection */}
							<div className="flex flex-col gap-2">
								<div className="font-medium flex gap-x-4">
									Item Image
									<button
										className="text-blue-500 hover:text-blue-600"
										onClick={() => setIsImagePickerOpen(true)}
									>
										Pick an image
									</button>
								</div>
								{imageResource && (
									<div className="relative">
										<img
											src={_imgLink(imageResource.s3Key)}
											alt="Item"
											className="object-cover rounded"
										/>
									</div>
								)}
							</div>
							{/* Max Uses Input */}
							<div className="flex flex-col gap-2">
								<label htmlFor="maxUses" className="font-medium">
									Maximum Uses (0 for inifinite)
								</label>
								<input
									id="maxUses"
									type="number"
									min="1"
									placeholder="Enter maximum number of uses..."
									className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={maxUses}
									onChange={(e) => setMaxUses(Number(e.target.value))}
								/>
							</div>

							{/* Expiry Date Input */}
							<div className="flex flex-col gap-2">
								<label htmlFor="expiryDate" className="font-medium">
									Expiry Date (Clear for no expiration)
								</label>
								<input
									id="expiryDate"
									type="datetime-local"
									className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={expiryDate}
									onChange={(e) => setExpiryDate(e.target.value)}
								/>
							</div>
						</>
					)}

					<button
						onClick={onSubmit}
						className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
					>
						Update Coupon
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminCouponDetailPage
