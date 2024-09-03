type MediaCardProps = {
	resource: MediaResource
	onClick: (r: MediaResource) => void
}

export default function MediaCard(props: MediaCardProps) {
	return (
		<div
			onClick={() => props.onClick(props.resource)}
			className="flex items-center w-[25vw] gap-x-8 p-4 rounded-lg bg-neutral-300 hover:bg-neutral-200 cursor-pointer"
		>
			<img
				className="w-[20%]"
				src="https://cdn-icons-png.flaticon.com/512/4725/4725998.png"
			/>
			<div>{props.resource.name}</div>
		</div>
	)
}
