import { Link, useLocation } from "react-router-dom"
import { FaHome, FaMotorcycle, FaShoppingCart, FaCog, FaImage } from "react-icons/fa"

const navItems = [
	{ name: "Dashboard", icon: FaHome, path: "/admin/dashboard" },
	{ name: "Motorbikes", icon: FaMotorcycle, path: "/admin/generic_motorbikes" },
	{ name: "Image Resources", icon: FaImage, path: "/admin/image_resources" },
	{ name: "Orders", icon: FaShoppingCart, path: "/admin/orders" },
	{ name: "Settings", icon: FaCog, path: "/admin/settings" },
]

function Navbar() {
	const location = useLocation()

	return (
		<nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
			<div className="mb-8">
				<h1 className="text-2xl font-bold">Admin Panel</h1>
			</div>
			<ul>
				{navItems.map((item) => (
					<li key={item.name} className="mb-2">
						<Link
							to={item.path}
							className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
								location.pathname === item.path
									? "bg-blue-600"
									: "hover:bg-gray-700"
							}`}
						>
							<item.icon className="mr-3" />
							<span>{item.name}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default Navbar
