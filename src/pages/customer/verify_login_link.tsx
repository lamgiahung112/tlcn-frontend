import useUser from "@/hooks/zustand/useUser"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

function VerifyLoginLinkPage() {
	const { verifyLoginLink, getUser } = useUser()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const email = searchParams.get("email")
	const code = searchParams.get("code")
	if (!email || !code) {
		return <div>Invalid link</div>
	}

	useEffect(() => {
		if (!email || !code) {
			return
		}
		verifyLoginLink(email, code)
			.then(() => getUser())
			.then(() => navigate("/motorbikes"))
			.catch(() => navigate("/login"))
	}, [email, code])
	return <div>VerifyLoginLinkPage</div>
}

export default VerifyLoginLinkPage
