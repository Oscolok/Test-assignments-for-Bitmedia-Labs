import React, { useEffect, useState } from "react";
// import { Route } from "react-router-dom";
import Game from "./Components/Game/Game";
import "./App.scss";

const App = () => {
  const [test, settest] = useState(false);
  return (
    <div className="main">
      <Game test={test} />
    </div>
  );
};

export default App;
