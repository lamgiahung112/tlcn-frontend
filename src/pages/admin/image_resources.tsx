import ImageResourceAddPopup from "@/components/admin/image_resources_add_popup";
import useImageResource from "@/hooks/zustand/useImageResource";
import { _imgLink } from "@/utils/img-link";
import { FormEvent, useEffect, useState } from "react";

function AdminImageResourcesPage() {
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
        delete: deleteImage
    } = useImageResource();

    const [isAddPopupOpen, setIsPopupOpen] = useState(false)
    useEffect(() => {paginate()}, [])
    useEffect(() => {paginate()}, [name, page, perPage])

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this image resource?')) {
            deleteImage(id).then(paginate)
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Image Resources</h1>
                <button 
                    onClick={() => setIsPopupOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add
                </button>
            </div>
            {isAddPopupOpen && <ImageResourceAddPopup onClose={() => setIsPopupOpen(false)} />}
            {/* Filters */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items?.map((resource) => (
                    <div key={resource.id} className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="relative h-48 group">
                            <img
                                src={_imgLink(resource.s3Key)} 
                                alt={resource.filename}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button 
                                    onClick={() => handleDelete(resource.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2 truncate">{resource.filename}</h3>
                            <p className="text-sm text-gray-600 truncate">{resource.s3Key}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-8 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, total)} of {total} results
                </p>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => setPage(page-1)}
                        disabled={page === 1}
                        className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => setPage(page+1)}
                        disabled={page === totalPages}
                        className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminImageResourcesPage;