import { ImageResource, Paginated } from "@/custom";
import { Axios } from "@/utils/Axios";

type FilterImageDto = {
    page: number
    perPage: number
    name?: string
}

export function apiCreateImageResource(form: FormData) {
    return Axios.post('/image_resources/upload', form)
}

export function apiDeleteImageResource(id: number) {
    return Axios.delete(`/image_resources/${id}`)
}

export function apiFilterImageResources(data: FilterImageDto) {
    return Axios.get<Paginated<ImageResource>>('/image_resources', data)
}