import { Button } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';

interface Card {
  src: string;
  brand: string;
  title: string;
  price: string;
  onClick: () => void;
}

const Card = ({ title, src, brand, price, onClick }: Card) => {
  return (
    <Button
      className="flex flex-col text-left w-52 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2 h-full pb-1">
        <figure className="w-52 h-52 relative overflow-hidden">
          <Image
            src={src}
            alt="image"
            className="rounded-xl object-cover"
            fill
            sizes="13rem"
          />
        </figure>

        <div>
          <p className="text-xs font-extrabold">{brand}</p>
          <p className="text-xs">{title.replace(/(<b>|<\/b>)/g, '')}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-extrabold">
          {Number(price).toLocaleString()} 원
        </p>
        <p className="text-[11px] text-stone-400 ">비회원가</p>
      </div>
    </Button>
  );
};

export default React.memo(Card);
