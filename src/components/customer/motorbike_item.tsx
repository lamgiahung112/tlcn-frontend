import { GenericMotorbike } from '@/custom';
import { _currency } from '@/utils/format';
import { _imgLink } from '@/utils/img-link';
import React from 'react';
import { Link } from 'react-router-dom';

interface MotorbikeItemProps {
  item: GenericMotorbike;
}

const MotorbikeItem: React.FC<MotorbikeItemProps> = ({ item }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        {item.images && item.images[0] && (
          <img
            src={_imgLink(item.images[0].imageResource.s3Key)}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
        <p className="text-gray-600 mb-2">{item.model} | {item.category}</p>
        <p className="text-green-600 font-bold mb-2">{_currency(item.recommendedPrice)}</p>
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="w-6 h-6 rounded-full border border-gray-200" 
            style={{ backgroundColor: item.colorInHex }}
          />
          <span className="text-gray-600">{item.colorName}</span>
        </div>
        <Link to={`/motorbikes/${item.id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MotorbikeItem;