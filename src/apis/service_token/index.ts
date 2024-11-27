import { Paginated, ServiceToken } from "@/custom"
import { Axios } from "@/utils/Axios"

export function apiGetServiceHistory(page: number, perPage: number) {
	return Axios.get<Paginated<ServiceToken>>(
		`/service-tokens/history?page=${page}&perPage=${perPage}`
	)
}

export function apiMarkServiceTokenUsed(id: number) {
	return Axios.post(`/service-tokens/${id}/used`, null)
}

export function apiAdminGetServiceTokens(
	page: number,
	perPage: number,
	plateNumber?: string,
	status?: "USED" | "UNUSED"
) {
	return Axios.get<Paginated<ServiceToken>>(`/service-tokens/admin`, {
		page,
		perPage,
		plateNumber,
		status,
	})
}
