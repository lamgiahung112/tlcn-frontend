import { Link } from "react-router-dom"

function NavigationBar() {
	return (
		<nav className="h-minus-header bg-gray-800 p-6 flex-shrink-0">
			<div className="text-2xl font-bold text-white mb-6">YAMAHA ADMIN</div>
			<div className="text-gray-300 flex flex-col gap-y-4">
				<NavLink to="/admin/motorbikes">Motorbikes</NavLink>
				<NavLink to="/admin/media">Media Resources</NavLink>
				<NavLink to="/admin/posts">Posts</NavLink>
			</div>
		</nav>
	)
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<Link
			to={to}
			className="transition-colors duration-200 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-md"
		>
			{children}
		</Link>
	)
}

export default NavigationBar
