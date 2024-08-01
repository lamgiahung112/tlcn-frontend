import {MediaResourceFilterSlice} from "@/slices/admin/media-resource-filter-slice.ts";
import {Axios} from "@/utils/Axios.ts";

interface MediaResourceListResponse {

}

function getMediaResourceList(filters: MediaResourceFilterSlice) {
    Axios.get()
}