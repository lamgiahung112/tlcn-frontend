import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import AdminPage from "./pages/admin"
import LoginPage from "./pages/customer/login"
import AdminGenericMotorbikePage from "./pages/admin/generic_motorbike"
import AdminImageResourcesPage from "./pages/admin/image_resources"
import AdminGenericMotorbikeDetailPage from "./pages/admin/generic_motorbike_detail"
import MotorbikeListPage from "./pages/customer/motorbike_list"
import CustomerPage from "./pages/customer"
import MotorbikeDetailPage from "./pages/customer/motorbike_detail"
import CartDetailPage from "./pages/customer/cart_detail"
import ViewOrderPage from "./pages/customer/view_order"
import AdminOrderPage from "./pages/admin/orders"
import AdminOrderDetailPage from "./pages/admin/order_detail"
import AdminPostPage from "./pages/admin/post"
import AdminCreatePostPage from "./pages/admin/create_post"
import AdminEditPostPage from "./pages/admin/edit.post"
import PostPage from "./pages/customer/post"
import PostDetailPage from "./pages/customer/post_detail"
import AdminLoginPage from "./pages/admin/login"
import VerifyLoginLinkPage from "./pages/customer/verify_login_link"
import UserDashboardPage from "./pages/customer/user_dashboard"
import UserMotorbikePage from "./pages/customer/user_motorbikes"
import AdminServiceTokenPage from "./pages/admin/service_token"
import AdminCouponPage from "./pages/admin/coupons"
import AdminCreateCouponPage from "./pages/admin/create_coupon"
import AdminCouponDetailPage from "./pages/admin/coupon_detail"
import OrderDetail from "./components/customer/order_detail"
import UserOrderDetailPage from "./pages/customer/user_order_detail"
import RegisterPage from "./pages/customer/register"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/motorbikes" replace />,
	},
	{
		path: "/login",
		element: (
			<CustomerPage>
				<LoginPage />
			</CustomerPage>
		),
	},
	{
		path: "/user",
		element: (
			<CustomerPage>
				<UserDashboardPage />
			</CustomerPage>
		),
	},
	{
		path: "/user/motorbikes/:id",
		element: (
			<CustomerPage>
				<UserMotorbikePage />
			</CustomerPage>
		),
	},
	{
		path: "/user/orders/:orderPublicId",
		element: (
			<CustomerPage>
				<UserOrderDetailPage />
			</CustomerPage>
		),
	},
	{
		path: "/auth/login",
		element: <VerifyLoginLinkPage />,
	},
	{
		path: "/register",
		element: (
			<CustomerPage>
				<RegisterPage />
			</CustomerPage>
		),
	},
	{
		path: "/motorbikes",
		element: (
			<CustomerPage>
				<MotorbikeListPage />
			</CustomerPage>
		),
	},
	{
		path: "/motorbikes/:id",
		element: (
			<CustomerPage>
				<MotorbikeDetailPage />
			</CustomerPage>
		),
	},
	{
		path: "/cart",
		element: (
			<CustomerPage>
				<CartDetailPage />
			</CustomerPage>
		),
	},
	{
		path: "/orders/:orderPublicId",
		element: (
			<CustomerPage>
				<ViewOrderPage />
			</CustomerPage>
		),
	},
	{
		path: "/orders",
		element: (
			<CustomerPage>
				<ViewOrderPage />
			</CustomerPage>
		),
	},
	{
		path: "/posts",
		element: (
			<CustomerPage>
				<PostPage />
			</CustomerPage>
		),
	},
	{
		path: "/posts/:id",
		element: (
			<CustomerPage>
				<PostDetailPage />
			</CustomerPage>
		),
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
		element: <AdminLoginPage />,
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
	{
		path: "/admin/orders",
		element: (
			<AdminPage>
				<AdminOrderPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/orders/:orderPublicId",
		element: (
			<AdminPage>
				<AdminOrderDetailPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/posts",
		element: (
			<AdminPage>
				<AdminPostPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/posts/create",
		element: (
			<AdminPage>
				<AdminCreatePostPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/posts/:id",
		element: (
			<AdminPage>
				<AdminEditPostPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/service_tokens",
		element: (
			<AdminPage>
				<AdminServiceTokenPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/coupons",
		element: (
			<AdminPage>
				<AdminCouponPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/coupons/create",
		element: (
			<AdminPage>
				<AdminCreateCouponPage />
			</AdminPage>
		),
	},
	{
		path: "/admin/coupons/:code",
		element: (
			<AdminPage>
				<AdminCouponDetailPage />
			</AdminPage>
		),
	},
])

function App() {
	return <RouterProvider router={router}></RouterProvider>
}

export default App
