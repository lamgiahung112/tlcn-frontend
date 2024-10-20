import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AdminPage from "./pages/admin"
import LoginPage from "./pages/admin/login"
import AdminGenericMotorbikePage from "./pages/admin/generic_motorbike"

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>ok</div>,
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
])

function App() {
	return <RouterProvider router={router}></RouterProvider>
}

export default App
