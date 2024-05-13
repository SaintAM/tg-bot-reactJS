import { useEffect } from "react";
import Header from "./components/Header/Header";
import { useTelegram } from "./hooks/useTelegram";
import Button from "./components/Button/Button";
import "./App.css";
import ProductList from "./components/ProductList/ProductList";



function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();

  }, []);

  return (
    <div className="app">
      <Header />
      <ProductList/>
      <Button onClick={onToggleButton}>toggle</Button>
    </div>
  );
}

export default App;
