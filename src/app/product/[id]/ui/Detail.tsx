'use client';

import { SIZE_INVENTORY } from '@/app/lib/constants';
import { productItem } from '@/app/lib/store';
import Loading from '@/app/loading';
import { DefaultButton } from '@/components';
import type { ProductItem } from '@/types/product';
import { Button } from '@headlessui/react';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import Option from './Option';

export default function Detail() {
  const item = useAtomValue<ProductItem | null>(productItem);
  const [selectedOptions, setSelectedOptions] = useState<
    { size: number; quantity: number }[]
  >([]);

  const totalQuantity = selectedOptions.reduce(
    (acc, cur) => acc + cur.quantity,
    0,
  );

  const inventory = useMemo(
    () =>
      SIZE_INVENTORY.map((inv) => {
        const selected = selectedOptions.find((opt) => opt.size === inv.size);
        return selected
          ? { ...inv, stock: inv.stock - selected.quantity }
          : inv;
      }),
    [selectedOptions],
  );

  const selectSize = (size: number) => {
    setSelectedOptions((prev) => {
      const index = prev.findIndex((option) => option.size === size);
      if (index !== -1) {
        return prev.map((option, i) =>
          i === index ? { ...option, quantity: option.quantity + 1 } : option,
        );
      }
      return [...prev, { size, quantity: 1 }];
    });
  };

  const deleteOption = useCallback((size: number) => {
    setSelectedOptions((prev) => prev.filter((option) => option.size !== size));
  }, []);

  const incrementQuantity = useCallback((size: number) => {
    const initialStock =
      SIZE_INVENTORY.find((item) => item.size === size)?.stock ?? 0;

    setSelectedOptions((prev) =>
      prev.map((option) =>
        option.size === size && option.quantity < initialStock
          ? { ...option, quantity: option.quantity + 1 }
          : option,
      ),
    );
  }, []);

  const decrementQuantity = useCallback((size: number) => {
    setSelectedOptions((prev) =>
      prev.map((option) =>
        option.size === size && option.quantity > 1
          ? { ...option, quantity: option.quantity - 1 }
          : option,
      ),
    );
  }, []);

  // TODO:
  if (!item) return <Loading />;

  return (
    <>
      <article className="flex flex-col gap-20">
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <figure className="w-96 h-96 relative overflow-hidden ">
            <Image src={item.image} alt="product" fill sizes="100%" />
          </figure>

          <div className="border-l" />

          <section className="flex flex-col gap-6 md:w-1/2">
            <div>
              <p className="font-semibold ">{item.maker}</p>
              <p className="font-extrabold text-3xl">
                {Number(item.lprice).toLocaleString()} 원
              </p>
            </div>

            <div>
              <p className="">{item.title.replace(/(<b>|<\/b>)/g, '')}</p>
              <p className="text-sm text-stone-400 ">{`${item.brand} > ${item.category4}`}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              {inventory.map(({ size, stock }) => (
                <Button
                  key={size}
                  className="border px-5 py-3 rounded-lg data-[hover]:opacity-50 disabled:bg-gray-200 disabled:text-gray-500"
                  onClick={() => selectSize(size)}
                  disabled={!stock}
                >
                  {size}
                </Button>
              ))}
            </div>

            <div>
              <ul>
                {selectedOptions.map(({ size, quantity }) => (
                  <Option
                    size={size}
                    quantity={quantity}
                    key={size}
                    price={Number(item.lprice)}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    deleteOption={deleteOption}
                  />
                ))}
              </ul>

              <div>
                <div className="flex justify-between py-6">
                  <p className="font-semibold text-sm">합계</p>
                  <p className="font-bold text-2xl">
                    {(totalQuantity * Number(item.lprice)).toLocaleString()}원
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <DefaultButton
                    command="장바구니"
                    bgColor="bg-gray-800"
                    color="text-white"
                    onClick={() => {}}
                  />

                  <DefaultButton
                    command="구매하기"
                    bgColor="bg-white"
                    color="text-gray"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside>
          <h3 className="text-xl font-bold">이 브랜드의 다른 상품</h3>
          <section>{/* 브랜드에 필터링한 상품들 */}</section>
        </aside>
      </article>
    </>
  );
}
