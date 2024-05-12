import React from "react";
import Button from "../Button/Button";
import styles from './ProductItem.module.scss'
const tg = window.Telegram.WebApp;

const ProductItem = ({ product, className, onAdd, }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <li className={styles.product}>
      <img className={styles.img} src={product.imageUrl} alt="img пиццы"/>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.price}>
        <span>
          Стоимость: <b>{product.price} ₽</b>
        </span>
      </div>
      <Button className={styles.addBtn} onClick={onAddHandler}>
        Добавить в корзину
      </Button>
    </li>
  );
};

export default ProductItem;
