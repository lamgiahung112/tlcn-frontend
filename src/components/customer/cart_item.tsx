import { CartItemDetail } from '@/custom';
import useCart from '@/hooks/zustand/useCart';
import { _currency } from '@/utils/format';
import { _imgLink } from '@/utils/img-link';
import { memo } from 'react';

interface CartItemProps extends CartItemDetail {}

function CartItem({ item, quantity }: CartItemProps) {
  const updateCartDetail = useCart((state) => state.updateCartDetail)
  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white">
      <div className="w-32 h-32 bg-gray-100 rounded-md">
        <img src={_imgLink(item.image)} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">Color: {item.color}</p>
        <p className="text-green-600 font-medium">{_currency(item.price)}</p>
      </div>
      <div className="flex flex-col items-end gap-4">
        <div className="flex items-center gap-2">
          <button onClick={() => updateCartDetail(item.id, quantity - 1)} className="w-8 h-8 flex items-center justify-center border rounded-md">-</button>
          <span className="w-12 text-center">{quantity}</span>
          <button onClick={() => updateCartDetail(item.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center border rounded-md">+</button>
        </div>
        <button className="text-red-500 hover:text-red-600">Remove</button>
      </div>
    </div>
  );
}

export default memo(CartItem);