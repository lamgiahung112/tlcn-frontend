import Splash from "@/components/splash";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicPageLayout from "./layouts/public-page-layout.tsx";
import AdminPageLayout from "./layouts/admin-page-layout.tsx";

const Dashboard = lazy(() => import("@/pages/dashboard"));
const MotorbikeDetail = lazy(() => import("@/pages/motorbike-detail"));
const MotorbikeList = lazy(() => import("@/pages/motorbike-list"));
const AdminPage = lazy(() => import("@/pages/admin"));
const AdminLoginPage = lazy(() => import("@/pages/admin/login"));
const AdminMediaResourcePage = lazy(() => import("@/pages/admin/media"));

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
];

const adminRoutes = [
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/media",
    element: <AdminMediaResourcePage/>
  }
];

function App() {
  return (
    <Suspense fallback={<Splash />}>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map(({ path, element }) => {
            return (
              <Route
                key={path}
                path={path}
                element={<PublicPageLayout>{element}</PublicPageLayout>}
              />
            );
          })}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          {adminRoutes.map(({ path, element }) => {
            return (
              <Route
                key={path}
                path={path}
                element={<AdminPageLayout>{element}</AdminPageLayout>}
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
