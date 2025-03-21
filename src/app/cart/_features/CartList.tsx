'use client';

import { Button, CheckBox, Image, QuantityController } from '@/components';
import type { CartItem, QuantityHandlerType } from '@/lib/types';
import { memo } from 'react';
import styles from './CartList.module.scss';
import NoListData from './NoListData';

export type CartListProps = {
  cartItems: CartItem[];
  checkedItems: { [cartId: string]: boolean };
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & ItemHandlers;

interface HeaderProps {
  allChecked: boolean;
  onToggleAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ItemProps extends ItemHandlers {
  item: CartItem;
  checkedItems: { [cartId: string]: boolean };
}

type ItemHandlers = {
  onProductInfo: (item: CartItem) => void;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>, cartId: string) => void;
  onQuantityChange: QuantityHandlerType;
  onDelete: (id: string) => void;
};

export default function CartList(props: CartListProps) {
  const { cartItems, checkedItems, onToggleAll, ...rest } = props;

  const allChecked = cartItems.every((item) => checkedItems[item.cartId]);

  const headerProps = { allChecked, onToggleAll };
  const itemProps = {
    checkedItems,
    ...rest,
  };

  return (
    <div className={styles.list}>
      <Header {...headerProps} />

      {!cartItems.length && <NoListData />}
      {cartItems.map((item) => (
        <MemorizedItem key={item.cartId} {...itemProps} item={item} />
      ))}
    </div>
  );
}

function Header({ allChecked, onToggleAll }: HeaderProps) {
  return (
    <div className={styles.list__header}>
      <CheckBox checked={allChecked} onChange={onToggleAll} />
      <p>상품/옵션 정보</p>
      <p>수량</p>
      <p>주문 금액</p>
      <div />
    </div>
  );
}

function Item({
  item,
  checkedItems,
  onToggle,
  onQuantityChange,
  onDelete,
  onProductInfo,
}: ItemProps) {
  return (
    <li className={styles.item}>
      <CheckBox
        checked={checkedItems[item.cartId]}
        onChange={(e) => onToggle(e, item.cartId)}
      />

      <button
        type="button"
        onClick={() => onProductInfo(item)}
        className={styles.item__info_box}
      >
        <Image src={item.image} alt="product" width="8rem" height="7rem" />

        <div className={styles.item__info}>
          <p>{item.title.replace(/(<b>|<\/b>)/g, '')}</p>
          <p>{item.size}</p>
          <p>{item.price.toLocaleString()}원</p>
        </div>
      </button>

      <div className={styles.item__quantity}>
        <QuantityController
          size={item.size}
          id={item.cartId}
          quantity={item.quantity}
          onQuantityChange={onQuantityChange}
        />
      </div>

      <div className={styles.item__price}>
        <p>{(Number(item.price) * item.quantity).toLocaleString()}원</p>
      </div>

      <div className={styles.item__buttons}>
        <Button text="주문하기" onClick={() => {}} />
        <Button
          text="삭제하기"
          onClick={() => onDelete(item.cartId)}
          variant="white"
        />
      </div>
    </li>
  );
}

const MemorizedItem = memo(Item);
