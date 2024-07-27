import { Axios } from "@/utils/Axios.ts";

interface SessionValidResponse {
  isAuthenticated: boolean;
}

function getIsCurrentSessionValid() {
  return Axios.get<SessionValidResponse>("/auth");
}

export default getIsCurrentSessionValid;
