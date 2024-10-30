import { Navbar } from "@/components/customer"
import { ReactNode } from "react"

type CustomerPageProps = {
	children: ReactNode
}

function CustomerPage(props: CustomerPageProps) {
	return (
        <>
            <Navbar />
            <div className="mt-16 p-4">{props.children}</div>
        </>
    )
}

export default CustomerPage
