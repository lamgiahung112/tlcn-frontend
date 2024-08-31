import Splash from "@/components/splash"
import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PublicPageLayout from "./layouts/public-page-layout.tsx"
import AdminPageLayout from "./layouts/admin-page-layout.tsx"
import { useSelector } from "react-redux"
import { RootState } from "./store.ts"
import { twMerge } from "tailwind-merge"

const Dashboard = lazy(() => import("@/pages/dashboard"))
const MotorbikeDetail = lazy(() => import("@/pages/motorbike-detail"))
const MotorbikeList = lazy(() => import("@/pages/motorbike-list"))
const AdminPage = lazy(() => import("@/pages/admin"))
const AdminLoginPage = lazy(() => import("@/pages/admin/login"))
const AdminMediaResourcePage = lazy(() => import("@/pages/admin/media"))

const publicRoutes = [
	{
		path: "/",
		element: <Dashboard />,
	},
	{
		path: "/xe/:category/:motorbike-slug",
		element: <MotorbikeDetail />,
	},
	{
		path: "/xe",
		element: <MotorbikeList />,
	},
]

const adminRoutes = [
	{
		path: "/admin",
		element: <AdminPage />,
	},
	{
		path: "/admin/media",
		element: <AdminMediaResourcePage />,
	},
]

function App() {
	const { isLoading } = useSelector((state: RootState) => state.loading)
	return (
		<Suspense fallback={<Splash />}>
			<div
				className={twMerge(
					"fixed flex items-center justify-center inset-0 w-[100vw] h-[100vh] bg-neutral-400 z-20 bg-opacity-50",
					!isLoading ? "hidden" : ""
				)}
			>
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
			</div>
			<BrowserRouter>
				<Routes>
					{publicRoutes.map(({ path, element }) => {
						return (
							<Route
								key={path}
								path={path}
								element={<PublicPageLayout>{element}</PublicPageLayout>}
							/>
						)
					})}
					<Route path="/admin/login" element={<AdminLoginPage />} />
					{adminRoutes.map(({ path, element }) => {
						return (
							<Route
								key={path}
								path={path}
								element={<AdminPageLayout>{element}</AdminPageLayout>}
							/>
						)
					})}
				</Routes>
			</BrowserRouter>
		</Suspense>
	)
}

export default App
