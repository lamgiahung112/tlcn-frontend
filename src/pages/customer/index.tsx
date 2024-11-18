import { Navbar } from "@/components/customer"
import useUser from "@/hooks/zustand/useUser"
import { ReactNode, useEffect } from "react"

type CustomerPageProps = {
	children: ReactNode
}

function CustomerPage(props: CustomerPageProps) {
	const { getUser, isLoaded } = useUser()
	useEffect(() => {
		if (!isLoaded) {
			getUser()
		}
	}, [isLoaded])
	return (
		<>
			<Navbar />
			<div className="mt-16 p-4">{props.children}</div>
		</>
	)
}

export default CustomerPage
