import { ImageResource } from "@/custom";
import useImageResource from "@/hooks/zustand/useImageResource";
import { _imgLink } from "@/utils/img-link";
import { useEffect, useState } from "react";

type ImageResourcePickerProps = {
    isMultiple: boolean;
    onSingleResourcePick?: (resource: ImageResource) => void;
    onMultipleResourcesPick?: (resources: ImageResource[]) => void;
    onClose: () => void;
}

function ImageResourcePicker({ isMultiple, onSingleResourcePick, onMultipleResourcesPick, onClose }: ImageResourcePickerProps) {
    const {
        page,
        perPage,
        name,
        total,
        totalPages,
        paginate,
        items,
        setName,
        setPage,
        setPerPage,
    } = useImageResource();

    const [selectedResources, setSelectedResources] = useState<ImageResource[]>([]);

    useEffect(() => { paginate() }, []);
    useEffect(() => { paginate() }, [name, page, perPage]);

    const handleResourceClick = (resource: ImageResource) => {
        if (isMultiple) {
            setSelectedResources(prev => 
                prev.some(r => r.id === resource.id)
                    ? prev.filter(r => r.id !== resource.id)
                    : [...prev, resource]
            );
        } else {
            onSingleResourcePick?.(resource);
            onClose();
        }
    };

    const handleConfirm = () => {
        if (isMultiple && onMultipleResourcesPick) {
            onMultipleResourcesPick(selectedResources);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => {e.stopPropagation();onClose();}}>
            <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Select Image Resources</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white shadow rounded-lg p-4 mb-6">
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="name" 
                                type="text" 
                                placeholder="Search by name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="per-page">
                                Per Page
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="per-page"
                                    value={perPage}
                                    onChange={(e) => setPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Image Resource Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items?.map((resource) => (
                        <div 
                            key={resource.id} 
                            className={`bg-white shadow rounded-lg overflow-hidden cursor-pointer ${
                                isMultiple && selectedResources.some(r => r.id === resource.id) ? 'ring-2 ring-blue-500' : ''
                            }`}
                            onClick={() => handleResourceClick(resource)}
                        >
                            <div className="relative h-40 group">
                                <img
                                    src={_imgLink(resource.s3Key)} 
                                    alt={resource.filename}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-3">
                                <h3 className="font-semibold text-sm mb-1 truncate">{resource.filename}</h3>
                                <p className="text-xs text-gray-600 truncate">{resource.s3Key}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Pagination */}
                <div className="mt-6 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} results
                    </p>
                    <div className="flex space-x-2">
                        <button 
                            onClick={() => setPage(page-1)}
                            disabled={page === 1}
                            className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => setPage(page+1)}
                            disabled={page === totalPages}
                            className="px-3 py-1 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Confirm button for multiple selection */}
                {isMultiple && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Confirm Selection ({selectedResources.length})
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImageResourcePicker;