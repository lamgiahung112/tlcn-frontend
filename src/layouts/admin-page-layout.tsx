import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import { Navigate } from "react-router-dom";
import getIsSessionValid from "@/api/auth/getIsSessionValid.ts";
import { auth, removeAuth } from "@/slices/sessionSlice.tsx";
import Header from "@/components/admin/header";
import NavigationBar from "@/components/admin/NavigationBar";

function AdminPageLayout({ children }: { children: ReactNode }) {
  const { sessionId } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();
  const localSessionId = localStorage.getItem("__session__");

  useEffect(() => {
    if (!sessionId && localSessionId) {
      getIsSessionValid()
        .then(() => dispatch(auth(localSessionId)))
        .catch(() => dispatch(removeAuth()));
    }
  }, [sessionId, localSessionId]);

  if (!sessionId && !localSessionId) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="mt-header-height flex">
      <Header />
      <NavigationBar />
      {children}
    </div>
  );
}

export default AdminPageLayout;
