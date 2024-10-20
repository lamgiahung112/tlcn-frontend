import { apiCheckAuth } from "@/apis/auth/checkAuth"
import { apiLogin } from "@/apis/auth/login"
import { create } from "zustand"

type UseAdminState = {
	sessionId: string | undefined
	isAuthenticated: boolean | undefined
}

type UseAdminAction = {
	checkAuth: () => Promise<void>
	login: (username: string, password: string) => Promise<void>
}

const useAdmin = create<UseAdminState & UseAdminAction>((set) => {
	return {
		isAuthenticated: undefined,
		sessionId: localStorage.getItem("__session__") ?? undefined,
		async checkAuth() {
			const authResponse = await apiCheckAuth()
			set((state) => ({
				...state,
				isAuthenticated: !!authResponse.isAuthenticated,
			}))
		},
		async login(username, password) {
			const loginResponse = await apiLogin({ username, password }).catch(() => null)
			if (!loginResponse) {
				set((state) => ({
					...state,
					sessionId: undefined,
					isAuthenticated: false,
				}))
				return
			}
			localStorage.setItem("__session__", loginResponse.sessionId)
			set((state) => ({
				...state,
				sessionId: loginResponse.sessionId,
				isAuthenticated: true,
			}))
		},
	}
})

export default useAdmin
