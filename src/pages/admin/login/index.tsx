import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import getIsSessionValid from "../../../api/auth/getIsSessionValid.ts";
import { auth, removeAuth } from "../../../slices/sessionSlice.tsx";
import login from "../../../api/auth/login.ts";

function AdminLoginPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { sessionId } = useSelector((state: RootState) => state.session);
  const dispatch = useDispatch();

  useEffect(() => {
    const localSessionId = localStorage.getItem("__session__");
    if (!sessionId && localSessionId) {
      getIsSessionValid()
        .then(() => dispatch(auth(localSessionId)))
        .catch(() => dispatch(removeAuth()));
    }
  }, [sessionId, localStorage.getItem("__session__")]);

  const onSubmit = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setIsLoading(false);
      return;
    }
    login(username, password)
      .then(({ sessionId }) => dispatch(auth(sessionId)))
      .catch(() => dispatch(removeAuth()))
      .finally(() => setIsLoading(false));
  };

  if (sessionId && localStorage.getItem("__session__"))
    return <Navigate to="/admin" />;
  return (
    <div className="flex items-center justify-center bg-blue-300 w-screen h-screen">
      <div className="flex flex-col p-8 gap-y-16 rounded-lg bg-white w-[50%]">
        <img
          className="h-[5%] self-center"
          src="https://yamaha-motor.com.vn/wp/wp-content/themes/yamaha/assets/img/share/logo.png"
          alt=""
        />
        <div className="flex flex-col items-start gap-y-8">
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-lg font-medium">Username:</label>
            <input
              ref={usernameRef}
              name="username"
              type="text"
              className="p-2 rounded-md outline outline-neutral-500 outline-1"
            />
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <label className="text-lg font-medium">Password:</label>
            <input
              ref={passwordRef}
              name="password"
              type="password"
              className="p-2 rounded-md outline outline-neutral-500 outline-1"
            />
          </div>
          <button
            disabled={isLoading}
            onClick={onSubmit}
            className="w-full bg-red-300 p-4 rounded-md text-lg font-medium hover:bg-red-200 disabled:bg-neutral-500 disabled:cursor-wait"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
