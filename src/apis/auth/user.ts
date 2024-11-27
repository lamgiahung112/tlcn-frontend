import { User } from "@/custom"
import { Axios } from "@/utils/Axios"

export const register = async (email: string, name: string, phoneNumber: string) => {
	return Axios.post("/auth/register", { email, name, phoneNumber })
}

export const sendLoginLink = async (email: string) => {
	return Axios.post("/auth/send-login-link", { email })
}

export const verifyLoginLink = async (email: string, code: string) => {
	return Axios.post("/auth/verify-login-link", { email, code })
}

export const getUser = async () => {
	return Axios.get<User>("/auth/user", null)
}
