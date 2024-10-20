import { Axios } from "@/utils/Axios";

type ApiCheckAuthResponse = {
    isAuthenticated: boolean
}

export function apiCheckAuth() {
    return Axios.get<ApiCheckAuthResponse>('/auth')
}