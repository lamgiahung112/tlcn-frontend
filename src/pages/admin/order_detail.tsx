import AdminOrderDetail from "@/components/admin/admin_order_detail"
import { useOrder } from "@/hooks/zustand/useOrder"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

function AdminOrderDetailPage() {
    const { orderPublicId } = useParams()
	const { currentOrder, getAdminOrder } = useOrder()

	useEffect(() => {
		if (orderPublicId) {
			getAdminOrder(orderPublicId)
		}
	}, [orderPublicId])

	return <AdminOrderDetail/>
}

export default AdminOrderDetailPage