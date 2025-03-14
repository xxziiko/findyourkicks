import React from 'react';
import styles from './Card.module.scss';
import Image from './Image';

interface Card {
  src: string;
  brand: string;
  title: string;
  price: string;
  onClick: () => void;
}

const Card = ({ title, src, brand, price, onClick }: Card) => {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <div className={styles.card__content}>
        <Image src={src} alt="product" width="13rem" height="13rem" />

        <div className={styles.card__details}>
          <p className={styles['card__details--brand']}>{brand}</p>
          <p>{title.replace(/(<b>|<\/b>)/g, '')}</p>
        </div>
      </div>

      <div>
        <p className={styles.card__price}>
          {Number(price).toLocaleString()} 원
        </p>
        <p className={styles.card__sub}>비회원가</p>
      </div>
    </button>
  );
};

export default React.memo(Card);
