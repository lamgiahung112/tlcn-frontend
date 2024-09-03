import updateResource from "@/api/admin/media-resource/updateResource"
import useData from "@/hooks/common/useData"
import { useState } from "react"

type MediaPopupProps = {
	data: {
		open: boolean
		resource: MediaResource | undefined
	}
	onPopupClose: () => void
}

function MediaPopup(props: MediaPopupProps) {
	const [name, setName] = useState(props.data.resource?.name ?? "")
	const { fetch, error } = useData(updateResource)

	if (!props.data.open) {
		return <></>
	}

	return (
		<div
			onClick={props.onPopupClose}
			className="flex justify-center items-center fixed inset-0 w-[100vw] h-[100vh] bg-neutral-300 bg-opacity-50"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col gap-y-8 justify-between p-4 bg-white w-1/2 rounded-lg"
			>
				<div className="text-4xl font-medium">
					{props.data.resource ? `Update resource` : `Add resource`}
				</div>
				{props.data.resource && (
					<div className="flex-[1] flex gap-x-8">
						<div className="flex flex-col items-center gap-y-4 w-1/2">
							<img
								src={props.data.resource.url}
								className="hover:scale-125 cursor-pointer"
								onClick={() => window.open(props.data.resource!.url)}
							/>
							<div className="bg-white">Preview</div>
						</div>
						<div className="flex flex-col flex-[1] gap-x-2">
							<div className="flex gap-x-4 items-center w-full">
								<label className="w-[20%]">File name:</label>
								<input
									className="flex-[1] p-2 outline-none border border-black border-t-0 border-l-0 border-r-0"
									defaultValue={props.data.resource?.name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="flex gap-x-4 items-center w-full">
								<label className="w-[20%]">Created At:</label>
								<input
									disabled
									className="flex-[1] p-2 outline-none border border-black border-t-0 border-l-0 border-r-0"
									defaultValue={props.data.resource.created_at
										.replace("T", " ")
										.replace("Z", " ")}
								/>
							</div>
							<div className="mt-8 text-red-600">
								{error.map((err) => (
									<div>{err}</div>
								))}
							</div>
						</div>
					</div>
				)}
				<button
					onClick={() => fetch({ id: props.data.resource!.id, fileName: name })}
					className="bg-green-500 rounded-md p-3 text-white text-xl font-medium hover:bg-green-400"
				>
					{props.data.resource ? `Update` : `Add`}
				</button>
			</div>
		</div>
	)
}

export default MediaPopup
