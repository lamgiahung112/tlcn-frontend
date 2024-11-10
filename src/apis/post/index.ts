import { Paginated, Post } from "@/custom"
import { Axios } from "@/utils/Axios"

export interface PostRequestDto {
	title: string
	excerpt: string
	content: string
	thumbnailResourceId: number
}

export function apiCreatePost(body: PostRequestDto) {
	return Axios.post("/posts", body)
}

export function apiUpdatePost(id: number, body: PostRequestDto) {
	return Axios.put(`/posts/${id}`, body)
}

export function apiDeletePost(id: number) {
	return Axios.delete(`/posts/${id}`)
}

export function apiPaginatePost(page: number, perPage: number, name?: string) {
	return Axios.get<Paginated<Post>>("/posts", { page, perPage, name })
}

export function apiAdminPaginatePost(page: number, perPage: number, name?: string) {
	return Axios.get<Paginated<Post>>("/posts/admin", { page, perPage, name })
}

export function apiGetPostById(id: number) {
	return Axios.get<Post>(`/posts/${id}`)
}

export function apiPublishPost(id: number) {
	return Axios.put(`/posts/${id}/publish`, null)
}

export function apiUnpublishPost(id: number) {
	return Axios.put(`/posts/${id}/unpublish`, null)
}

