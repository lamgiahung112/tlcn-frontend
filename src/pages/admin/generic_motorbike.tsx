import React, { useEffect, useState } from 'react';
import useGenericMotorbike from '@/hooks/zustand/useGenericMotorbike';
import GenericMotorbikeItem from '@/components/admin/generic_motorbike_item';
import { GenericMotorbikeAddPopup } from '@/components/admin';
import { Category } from '@/custom';

const AdminGenericMotorbikesPage: React.FC = () => {
  const {
    items,
    isLoading,
    page,
	  total,
	  totalPages,
    perPage,
    paginate,
    setPage,
    setPerPage,
    setName,
    setCategory,
    setMinPrice,
    setMaxPrice,
  } = useGenericMotorbike();
  const [isAddPopupOpen, setAddPopupOpen] = useState(false)

  useEffect(() => {
    paginate();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    paginate();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    paginate();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generic Motorbikes</h1>
      {isAddPopupOpen ? <GenericMotorbikeAddPopup onClose={() => setAddPopupOpen(false)} /> : null}
      <button onClick={() => setAddPopupOpen(true)}>Test</button>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
          <select
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border p-2 rounded"
          >
            <option value="">All Categories</option>
            {["SCOOTER", "HEAVY", "STROKE"].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border p-2 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <GenericMotorbikeItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          Showing {(page - 1) * perPage + 1} - {Math.min(page * perPage, total)} of {total} items
        </div>
        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGenericMotorbikesPage;