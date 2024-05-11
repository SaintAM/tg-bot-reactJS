import React, { useCallback, useEffect, useState } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
const tg = window.Telegram.WebApp;

const products = [
  {
    id: "1",
    title: "Джинсы",
    price: 5000,
    description: "Синего цвета, прямые",
  },
  { id: "2", title: "Джинсы", price: 7000, description: "Желтого цвета, овер" },
  {
    id: "3",
    title: "Куртка",
    price: 8000,
    description: "Черного цвета, зимняя",
  },
  {
    id: "4",
    title: "Парка",
    price: 12000,
    description: "Оранжевого цвета",
  },
];
const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => acc += item.price, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);
  const { queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };

    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData); // onEvent - слушатель событий

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    const newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }
    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить за: ${getTotalPrice(newItems)} рублей`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => (
        <ProductItem product={item} onAdd={onAdd} className={"item"} />
      ))}
    </div>
  );
};

export default ProductList;
