import { Axios } from "@/utils/Axios.ts";

interface LoginResponse {
  sessionId: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

function login(username: string, password: string) {
  return Axios.post<LoginResponse, LoginRequest>("/auth/login", {
    username,
    password,
  });
}

export default login;
