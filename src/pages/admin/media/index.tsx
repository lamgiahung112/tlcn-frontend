import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../store.ts"
import { setName, setSort } from "../../../slices/admin/media-resource-filter-slice.ts"
import { useEffect, useState } from "react"
import getMediaResourceList from "@/api/admin/media-resource/getMediaResourceList.ts"
import MediaCard from "./media-card.tsx"
import useData from "@/hooks/common/useData.ts"
import { AddMediaPopup, UpdateMediaPopup } from "./media-popup.tsx"
import { Db } from "@/custom.js"

function MediaPage() {
	const filters = useSelector((state: RootState) => state.mediaResourceFilter)
	const dispatch = useDispatch()
	const { data, fetch } = useData(getMediaResourceList, [])
	const [popupData, setPopupData] = useState<{
		open: boolean
		resource: Db.Resource | undefined
	}>({
		open: false,
		resource: undefined,
	})

	useEffect(() => {
		fetch(filters)
	}, [filters.name, filters.page, filters.size, filters.sort])

	return (
		<div className="flex flex-col gap-y-4 px-4 w-full h-minus-header">
			<div className="flex gap-x-4 items-center">
				<div className="text-3xl font-semibold">Media Resources</div>
				<button
					onClick={() => setPopupData({ open: true, resource: undefined })}
					className="px-8 py-2 rounded-md bg-green-500 text-white hover:bg-green-400"
				>
					Upload
				</button>
				<button
					onClick={() => fetch(filters)}
					className="px-8 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400 transition-colors"
				>
					Refresh
				</button>
			</div>
			<input
				className="p-4 outline outline-[1px] outline-neutral-300 rounded-md border-transparent"
				placeholder="Search by name"
				onChange={(e) => dispatch(setName(e.target.value))}
			/>
			{popupData.open === true && !popupData.resource && (
				<AddMediaPopup
					onClose={() => {
						setPopupData({ open: false, resource: undefined })
						fetch(filters)
					}}
				/>
			)}
			{popupData.open === true && popupData.resource && (
				<UpdateMediaPopup
					onClose={() => {
						setPopupData({ open: false, resource: undefined })
						fetch(filters)
					}}
					resource={popupData.resource}
				/>
			)}
			<div className="flex gap-x-4">
				<div>Created date:</div>
				<input
					type="checkbox"
					checked={filters.sort.created_at === "asc"}
					onChange={() => {
						dispatch(setSort("asc"))
					}}
				/>
				<div>Ascending</div>
				<input
					type="checkbox"
					checked={filters.sort.created_at === "desc"}
					onChange={() => {
						dispatch(setSort("desc"))
					}}
				/>
				<div>Descending</div>
				<input
					defaultValue="checked"
					checked={filters.sort.created_at === undefined}
					onChange={() => {
						dispatch(setSort(undefined))
					}}
					type="checkbox"
				/>
				<div>No</div>
			</div>
			<div className="flex flex-wrap gap-x-8 gap-y-8">
				{data?.map((r) => (
					<MediaCard
						onClick={(r) => setPopupData({ open: true, resource: r })}
						resource={r}
						key={r.id}
					/>
				))}
			</div>
		</div>
	)
}

export default MediaPage
