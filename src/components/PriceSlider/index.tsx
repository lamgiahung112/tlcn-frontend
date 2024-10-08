import { round } from "@/utils/number"
import { useEffect, useRef, useState } from "react"

const CAP_PRICE = 600

function PriceSlider() {
	const [isDragging, setIsDragging] = useState(false)
	const [draggingElement, setDraggingElement] = useState(0)
	const [minX, setMinX] = useState(0)
	const [maxX, setMaxX] = useState(0)
	const [minPriceDisplay, setMinPriceDisplay] = useState(0)
	const [maxPriceDisplay, setMaxPriceDisplay] = useState(CAP_PRICE)
	const minAnchorRef = useRef<HTMLDivElement>(null)
	const maxAnchorRef = useRef<HTMLDivElement>(null)
	const minSliderRef = useRef<HTMLDivElement>(null)
	const maxSliderRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const minAnchorX = minAnchorRef.current?.getBoundingClientRect().left
		const maxAnchorX = maxAnchorRef.current?.getBoundingClientRect().right
		const totalSpace = Math.abs(maxAnchorX! - minAnchorX!)

		function handleDrag(event: MouseEvent) {
			if (!isDragging || draggingElement === 0) return

			if (draggingElement === -1) {
				let offset = event.clientX - minAnchorX!
				offset = Math.max(0, offset)
				offset = Math.min(maxAnchorX! - minAnchorX!, offset)
				if (maxX < 0) {
					offset = Math.min(maxX! + maxAnchorX! - minAnchorX!, offset)
				}
				setMinX(offset)
				setMinPriceDisplay(round((offset / totalSpace) * CAP_PRICE, 2))
			}
			if (draggingElement === 1) {
				let offset = maxAnchorX! - event.clientX
				offset = Math.max(0, offset)
				offset = Math.min(maxAnchorX! - minAnchorX!, offset)
				if (minX > 0) {
					offset = Math.min(maxAnchorX! - minAnchorX! - minX, offset)
				}
				setMaxX(-offset)
				setMaxPriceDisplay(
					round(CAP_PRICE - (offset / totalSpace) * CAP_PRICE, 2)
				)
			}
		}

		function stopDrag() {
			setIsDragging(false)
			setDraggingElement(0)
		}

		if (isDragging) {
			document.addEventListener("mousemove", handleDrag)
			document.addEventListener("mouseup", stopDrag)
		} else {
			document.removeEventListener("mousemove", handleDrag)
			document.removeEventListener("mouseup", stopDrag)
		}

		return () => {
			document.removeEventListener("mousemove", handleDrag)
			document.removeEventListener("mouseup", stopDrag)
		}
	}, [
		isDragging,
		draggingElement,
		minAnchorRef,
		maxAnchorRef,
		minSliderRef,
		maxSliderRef,
	])

	function onMinAnchorMouseDown() {
		setIsDragging(true)
		setDraggingElement(-1)
	}

	function onMaxAnchorMouseDown() {
		setIsDragging(true)
		setDraggingElement(1)
	}

	return (
		<div className="relative">
			<div className="w-full p-6">
				<div className="absolute top-[50%] left-0 w-full h-[1px] bg-neutral-400"></div>
				<div
					ref={minAnchorRef}
					className="absolute top-[calc(50%-0.5rem)] left-0 w-[1px] h-4 bg-neutral-400"
				></div>
				<div
					ref={maxAnchorRef}
					className="absolute top-[calc(50%-0.5rem)] right-0 w-[1px] h-4 bg-neutral-400"
				></div>
				<div className="absolute top-[calc(50%-0.5rem)] right-[50%] w-[1px] h-4 bg-neutral-400"></div>
				<div
					onMouseDown={onMinAnchorMouseDown}
					ref={minSliderRef}
					style={{
						translate: `${minX}px 0px`,
					}}
					className="absolute top-[calc(50%-0.5rem)] left-[-0.5rem] h-[17px] w-[17px] rounded-full bg-black z-10"
				></div>
				<div
					onMouseDown={onMaxAnchorMouseDown}
					ref={maxSliderRef}
					style={{
						translate: `${maxX}px 0px`,
					}}
					className="absolute top-[calc(50%-0.5rem)] right-[-0.5rem] h-[17px] w-[17px] rounded-full bg-black z-20"
				></div>
			</div>
			<div className="w-full flex justify-between">
				<div>{minPriceDisplay}</div>
				<div>{maxPriceDisplay}</div>
			</div>
		</div>
	)
}

export default PriceSlider
