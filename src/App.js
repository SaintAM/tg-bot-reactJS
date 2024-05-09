import { useEffect } from "react";
import "./App.css";


function App() {


  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="app">
      front channed
      
    </div>
  );
}

export default App;
