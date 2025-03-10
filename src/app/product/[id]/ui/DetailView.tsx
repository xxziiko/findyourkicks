import { Button } from '@/components';
import type { DetailViewProps } from '@/types/product';
import Image from 'next/image';
import styles from './DetailView.module.scss';
import Option from './Option';

export default function DetailView(props: DetailViewProps) {
  const {
    item,
    price,
    inventory,
    totalQuantity,
    selectedOptions,

    handleSelectSize,
    onDeleteButtonClick,
    onIncrementButtonClick,
    onDecrementButtonClick,
    handleCartButton,
  } = props;

  return (
    <article className={styles.detail}>
      <figure className={styles.detail__image}>
        <Image src={item.image} alt="product" fill sizes="100%" />
      </figure>

      <div className={styles.detail__divider} />

      <section className={styles.detail__content}>
        <div>
          <p className={styles['detail__text--brand']}>{item.maker}</p>
          <p className={styles['detail__text--price']}>
            {Number(item.lprice).toLocaleString()} 원
          </p>
        </div>

        <div>
          <p className="">{item.title.replace(/(<b>|<\/b>)/g, '')}</p>
          <p
            className={styles['detail__text--subtitle']}
          >{`${item.brand} > ${item.category4}`}</p>
        </div>

        <div className={styles.detail__options}>
          {inventory.map(({ size, stock }) => (
            <Button
              key={size}
              variant="lined"
              onClick={() => handleSelectSize(size)}
              disabled={!stock}
              text={size}
            />
          ))}
        </div>

        <ul>
          {selectedOptions.map(({ size, quantity }) => (
            <Option
              size={size}
              quantity={quantity}
              key={size}
              price={price}
              onIncrementButtonClick={onIncrementButtonClick}
              onDecrementButtonClick={onDecrementButtonClick}
              onDeleteButtonClick={onDeleteButtonClick}
            />
          ))}
        </ul>

        <div className={styles.detail__bottom}>
          <p className={styles['detail__bottom--total']}>합계</p>
          <p className={styles['detail__bottom--price']}>
            {(totalQuantity * price).toLocaleString()}원
          </p>
        </div>

        <div className={styles.detail__button_box}>
          <Button text="장바구니" onClick={handleCartButton} />
          <Button text="구매하기" onClick={() => {}} variant="white" />
        </div>
      </section>
    </article>
  );
}
