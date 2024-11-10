import useCart from "@/hooks/zustand/useCart"
import { _imgLink } from "@/utils/img-link"
import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom"

const Navbar = () => {
	const { cart } = useCart()
	return (
		<nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-50">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<Link to="/">
							<img
								src={_imgLink(
									"uploads/d5c5d643-54db-4231-8721-6f20bb62ead2-logo.webp"
								)}
								alt="Yamaha Logo"
								width={120}
								height={40}
								className="cursor-pointer"
							/>
						</Link>
					</div>

					{/* Navigation Links */}
					<div className="hidden md:flex items-center space-x-8">
						<Link
							to="/motorbikes"
							className="text-gray-700 hover:text-blue-600 transition-colors"
						>
							XE MÁY
						</Link>
						<Link
							to="/posts"
							className="text-gray-700 hover:text-blue-600 transition-colors"
						>
							KHUYẾN MÃI
						</Link>
						<Link to="/cart" className="relative">
							<FaShoppingCart className="text-2xl text-gray-700 hover:text-blue-600 transition-colors" />
							<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
								{cart.length}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
