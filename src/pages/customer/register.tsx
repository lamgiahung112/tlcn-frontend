import useUser from "@/hooks/zustand/useUser"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function RegisterPage() {
	const { isLoaded, user, getUser, register } = useUser()
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (isLoaded && user) {
			navigate("/")
		}
		if (!isLoaded) {
			getUser()
		}
	}, [isLoaded, user])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			await register(email, name, phoneNumber)
			navigate("/login")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
				<h2 className="text-center text-3xl font-bold text-gray-900">
					Login to Your Account
				</h2>

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
							placeholder="Enter your email"
						/>
					</div>
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							id="name"
							type="text"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
							placeholder="Enter your name"
						/>
					</div>
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Phone number
						</label>
						<input
							id="phone"
							type="text"
							required
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
							className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
							placeholder="Enter your phone number"
						/>
					</div>
					<div className="text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link className="text-blue-500" to="/login">
							Login
						</Link>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
					>
						{isLoading ? "Registering..." : "Register"}
					</button>
				</form>
			</div>
		</div>
	)
}

export default RegisterPage
