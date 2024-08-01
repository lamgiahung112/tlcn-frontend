import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store.ts";
import {setSort} from "../../../slices/admin/media-resource-filter-slice.ts";

function MediaPage() {
    const filters = useSelector((state: RootState) => state.mediaResourceFilter);
    const dispatch = useDispatch();

    return <div className="flex flex-col gap-y-4 px-4 w-full h-minus-header">
        <div className="text-3xl font-semibold">Media Resources</div>
        <input
            className="p-4 outline outline-[1px] outline-neutral-300 rounded-md border-transparent"
            placeholder="Search by name"
        />
        <div className="flex gap-x-4">
            <div>Created date:</div>
            <input
                type="checkbox"
                checked={filters.sort.created_at === 'ASC'}
                onChange={() => {
                    dispatch(setSort('ASC'))
                }}
            />
            <div>Ascending</div>
            <input
                type="checkbox"
                checked={filters.sort.created_at === 'DESC'}
                onChange={() => {
                    dispatch(setSort('DESC'))
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
    </div>
}

export default MediaPage;