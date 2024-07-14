export type SlugParams = {
    title: string
    href: string
}

interface SlugDisplayProps {
    slugs: SlugParams[]
}

function DirectorySlugDisplay(props: SlugDisplayProps) {
    return <div className="flex gap-x-4 px-10 py-2 bg-neutral-200 text-sm text-neutral-500">
        <div>TRANG CHU</div>
        {props.slugs.map((slug) => {
            return <>
                <div>{" -> "}</div>
                <div>{slug.title}</div>
            </>
        })}
    </div>
}

export default DirectorySlugDisplay;