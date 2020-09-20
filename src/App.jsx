import React from "react";
import { Route } from "react-router-dom";
import Game from "./Components/Game/Game";
import "./App.scss";

const App = () => {
  return (
    <div className="main">
      <Game />
    </div>
  );
};

export default App;
