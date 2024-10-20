import useAdmin from "@/hooks/zustand/useAdmin"
import { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/admin"

type AdminPageProps = {
	children: ReactNode
}

function AdminPage(props: AdminPageProps) {
	const { checkAuth, isAuthenticated, sessionId } = useAdmin()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuthenticated === undefined && sessionId) {
			checkAuth()
		} else if (isAuthenticated === false) {
			navigate("/admin/login")
		} else if (isAuthenticated === undefined && !sessionId) {
			navigate("/admin/login")
		}
	}, [isAuthenticated, sessionId])

	if (isAuthenticated) {
		return (
			<div className="flex">
				<Navbar />
				<div className="flex-[1]">{props.children}</div>
			</div>
		)
	}
	return null
}

export default AdminPage
