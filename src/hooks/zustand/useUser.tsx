import { getUser, register, sendLoginLink, verifyLoginLink } from "@/apis/auth/user"
import { User } from "@/custom"
import { create } from "zustand"

interface UserState {
	user: User | null
	isLoaded: boolean
	register: (email: string, password: string) => Promise<void>
	sendLoginLink: (email: string) => Promise<void>
	verifyLoginLink: (email: string, code: string) => Promise<void>
	getUser: () => Promise<void>
}

const useUser = create<UserState>((set) => ({
	user: null,
	isLoaded: false,
	async getUser() {
		const user = await getUser()
        set({ isLoaded: true })
		if (!user) {
			return
		}
		set({ user })
	},
	async register(email, password) {
		await register(email, password)
	},
	async sendLoginLink(email) {
		await sendLoginLink(email)
	},
	async verifyLoginLink(email, code) {
		await verifyLoginLink(email, code)
	},
}))

export default useUser
