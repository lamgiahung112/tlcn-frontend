import axios from "axios"

const instance = axios.create({
	baseURL: "http://localhost:4000",
})

export class Axios {
	static async get<T, P = any>(url: string, params?: P) {
		return instance
			.get<{ data: T }>(url, {
				params,
				headers: {
					"x-session-id": localStorage.getItem("__session__"),
				},
			})
			.then((res) => res.data.data)
	}

	static post<T, B>(url: string, data: B) {
		return instance
			.post<{ data: T }>(url, data, {
				headers: {
					"x-session-id": localStorage.getItem("__session__"),
				},
			})
			.then((res) => res.data.data)
	}

	static put<T, B>(url: string, data: B) {
		return instance
			.put<{ data: T }>(url, data, {
				headers: {
					"x-session-id": localStorage.getItem("__session__"),
				},
			})
			.then((res) => res.data.data)
	}

	static delete<T>(url: string) {
		return instance.delete<{ data: T }>(url, {
			headers: {
				"x-session-id": localStorage.getItem("__session__"),
			},
		})
	}
}
