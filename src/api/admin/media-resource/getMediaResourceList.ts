import { MediaResourceFilterSlice } from "@/slices/admin/media-resource-filter-slice.ts"
import { Axios } from "@/utils/Axios.ts"

function getMediaResourceList(filters: MediaResourceFilterSlice) {
	return Axios.get<MediaResource[]>("/resources", filters).catch(() => [])
}

export default getMediaResourceList
