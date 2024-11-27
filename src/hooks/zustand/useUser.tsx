import { getUser, register, sendLoginLink, verifyLoginLink } from "@/apis/auth/user"
import { apiGetMotorbikeDetail, apiGetUserMotorbikes } from "@/apis/user"
import { Motorbike, User } from "@/custom"
import { create } from "zustand"

interface UserState {
	user: User | null
	isLoaded: boolean
	motorbikes: Motorbike[]
	motorbike: Motorbike | null
}

interface UserActions {
	register: (email: string, name: string, phoneNumber: string) => Promise<void>
	sendLoginLink: (email: string) => Promise<void>
	verifyLoginLink: (email: string, code: string) => Promise<void>
	getUser: () => Promise<void>
	getUserMotorbikes: () => Promise<void>
	getMotorbikeDetail: (id: number) => Promise<void>
}

const useUser = create<UserState & UserActions>((set) => ({
	user: null,
	isLoaded: false,
	motorbikes: [],
	motorbike: null,
	async getUser() {
		const user = await getUser()
		set({ isLoaded: true })
		if (!user) {
			return
		}
		set({ user })
	},
	async register(email, name, phoneNumber) {
		await register(email, name, phoneNumber)
	},
	async sendLoginLink(email) {
		await sendLoginLink(email)
	},
	async verifyLoginLink(email, code) {
		await verifyLoginLink(email, code)
	},
	async getUserMotorbikes() {
		const motorbikes = await apiGetUserMotorbikes()
		set({ motorbikes })
	},
	async getMotorbikeDetail(id) {
		const motorbike = await apiGetMotorbikeDetail(id)
		set({ motorbike })
	},
}))

export default useUser
