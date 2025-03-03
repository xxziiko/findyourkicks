import { SIZE_INVENTORY } from '@/app/lib/constants';
import { Button } from '@headlessui/react';
import { CircleX } from 'lucide-react';
import { memo } from 'react';

interface BaseOption {
  size: number;
  quantity: number;
  price: number;
}

type SizeHandler = (size: number) => void;
type OptionHandlers = {
  [K in
    | 'decrementQuantity'
    | 'incrementQuantity'
    | 'deleteOption']: SizeHandler;
};
type IOption = BaseOption & OptionHandlers;

const Option = ({
  size,
  quantity,
  price,
  decrementQuantity,
  incrementQuantity,
  deleteOption,
}: IOption) => {
  const maxStock = (selectedSize: number) =>
    SIZE_INVENTORY.find(({ size }) => size === selectedSize)?.stock;

  return (
    <li
      key={size}
      className="flex justify-between py-5 item-center w-full border-b"
    >
      <p className="w-full">{size}</p>
      <div className="flex gap-5 w-full justify-center">
        <Button
          className="border px-2 rounded-lg  disabled:bg-gray-200 disabled:text-gray-500"
          onClick={() => decrementQuantity(size)}
          disabled={!quantity}
        >
          -
        </Button>
        <p>{quantity}</p>
        <Button
          className="border px-2 rounded-lg  disabled:bg-gray-200 disabled:text-gray-500"
          onClick={() => incrementQuantity(size)}
          disabled={quantity === maxStock(size)}
        >
          +
        </Button>
      </div>

      <div className="flex gap-2  w-full justify-end">
        <p className="font-bold">{(price * quantity).toLocaleString()} 원</p>

        <CircleX
          className="cursor-pointer"
          width={18}
          onClick={() => deleteOption(size)}
        />
      </div>
    </li>
  );
};

export default memo(Option);
