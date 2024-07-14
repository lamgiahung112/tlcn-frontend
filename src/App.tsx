import Splash from "@/components/splash";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/components/header";
const Dashboard = lazy(() => import("@/pages/dashboard"));
const MotorbikeDetail = lazy(() => import("@/pages/motorbike-detail"));

function App() {
  return (
    <Suspense fallback={<Splash />}>
      <BrowserRouter>
        <div className="mt-header-height">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/xe/:category/:motorbike-slug" element={<MotorbikeDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
