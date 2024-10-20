import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:4000",
})

export class Axios {
	static async get<T, P = any>(url: string, params?: P) {
		return instance
			.get<T>(url, {
				params,
				headers: {
					"x-session-id": localStorage.getItem("__session__"),
				},
			})
			.then((res) => res.data)
	}

	static post<T, B>(url: string, data: B) {
		return instance
			.post<T>(url, data, {
				headers: {
					"x-session-id": localStorage.getItem("__session__"),
				},
			})
			.then((res) => res.data)
	}

	static put<T, B>(url: string, data: B) {
		return instance
			.put<T>(url, data, {
				headers: {
					"x-session-id": localStorage.getItem("__session__"),
				},
			})
			.then((res) => res.data)
	}

	static delete<T>(url: string) {
		return instance.delete<T>(url, {
			headers: {
				"x-session-id": localStorage.getItem("__session__"),
			},
		})
	}
}
