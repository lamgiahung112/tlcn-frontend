import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminPage from "./pages/admin"
import LoginPage from "./pages/admin/login"
import AdminGenericMotorbikePage from "./pages/admin/generic_motorbike"
import AdminImageResourcesPage from "./pages/admin/image_resources"
import AdminGenericMotorbikeDetailPage from "./pages/admin/generic_motorbike_detail"
import MotorbikeListPage from "./pages/customer/motorbike_list"
import CustomerPage from "./pages/customer"
import MotorbikeDetailPage from "./pages/customer/motorbike_detail"
import CartDetailPage from "./pages/customer/cart_detail"

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>ok</div>,
	},
	{
		path: "/motorbikes",
		element: <CustomerPage><MotorbikeListPage /></CustomerPage>,
	},
	{
		path: "/motorbikes/:id",
		element: <CustomerPage><MotorbikeDetailPage /></CustomerPage>,
	},
	{
		path: "/cart",
		element: <CustomerPage><CartDetailPage /></CustomerPage>,
	},
	{
		path: "/admin",
		element: (
			<AdminPage>
				<div>admin</div>
			</AdminPage>
		),
	},
	{
		path: "/admin/login",
		element: <LoginPage />,
	},
	{
		path: "/admin/generic_motorbikes",
		element: (
			<AdminPage>
				<AdminGenericMotorbikePage />
			</AdminPage>
		),
	},
	{
		path: "/admin/image_resources",
		element: (
			<AdminPage>
				<AdminImageResourcesPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/generic_motorbikes/:id",
		element: (
			<AdminPage>
				<AdminGenericMotorbikeDetailPage />
			</AdminPage>
		),
	},
])

function App() {
	return <RouterProvider router={router}></RouterProvider>
}

export default App
