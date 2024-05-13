import React, { useCallback, useEffect, useState } from "react";
import "./ProductList.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { productService } from "../../services/products.service";

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => (acc += item.price), 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([]);

  const { data } = useQuery({
    queryKey: ["product key"],
    queryFn: () => productService.getProducts(),
  });
  console.log(data);

  const { queryId, tg } = useTelegram();
  // const queryId = tg.initDataUnsafe?.query_id;

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };

    fetch("http://localhost:8000/web-data", {
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
    let newItems = [];

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
  if (!data) return <>Загрузка...</>;

  return (
    <ul className={"list"}>
      {data.map((item) => (
        <ProductItem product={item} onAdd={onAdd}  />
      ))}
    </ul>
  );
};

export default ProductList;
