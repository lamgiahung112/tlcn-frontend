import { Axios } from "@/utils/Axios"

type ApiLoginResponse = {
	sessionId: string
}

type ApiLoginRequest = {
	username: string
	password: string
}

export function apiLogin(data: ApiLoginRequest) {
	return Axios.post<ApiLoginResponse, ApiLoginRequest>("/auth/login", data)
}
