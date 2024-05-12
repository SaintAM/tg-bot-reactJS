import React from "react";
import Button from "../Button/Button";
import { useTelegram } from "../../hooks/useTelegram";
import styles from "./Header.module.scss";

const Header = () => {
  const { onClose, user } = useTelegram();

  return (
    <div className={styles.header}>
      <span className={"username"}>{user?.username}</span>
      <Button className={styles.btnclose} onClick={onClose}>
        Закрыть
      </Button>
    </div>
  );
};

export default Header;
