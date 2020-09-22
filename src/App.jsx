import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Game from "./Components/Game/Game";
import Login from "./Components/Login/Login";
import Stats from "./Components/Stats/Stats";
import { getUsers } from "./redux/operation/userOperation";
import "./App.scss";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      history.replace("/");
      dispatch(getUsers());
    } else {
      history.replace("/login");
    }
  });

  return (
    <div className="main">
      <Switch>
        <Route exact path="/login" component={Login} />

        <Route exact path="/" component={Game} />
        <Route exact path="/stats" component={Stats} />

        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
