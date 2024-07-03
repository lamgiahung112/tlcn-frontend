import Splash from "@/components/splash";
import {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "@/components/header";

const Dashboard = lazy(() => import("@/components/dashboard"));

function App() {
  return (
    <Suspense fallback={<Splash/>}>
      <BrowserRouter>
        <div className="mt-header-height">
          <Header/>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
