import Splash from "@/components/splash";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/components/header";
const Dashboard = lazy(() => import("@/pages/dashboard"));
const MotorbikeDetail = lazy(() => import("@/pages/motorbike-detail"));
const MotorbikeList = lazy(() => import("@/pages/motorbike-list"));

function App() {
  return (
    <Suspense fallback={<Splash />}>
      <BrowserRouter>
        <div className="mt-header-height">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/xe/:category/:motorbike-slug" element={<MotorbikeDetail />} />
            <Route path="/xe" element={<MotorbikeList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
