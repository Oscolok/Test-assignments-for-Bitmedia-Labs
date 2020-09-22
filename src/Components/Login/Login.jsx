import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/operation/userOperation";
import "./Login.scss";

const Login = () => {
  const [input, setinput] = useState("");

  const dispatch = useDispatch();

  const inputHandler = ({ target }) => {
    setinput(target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (input.length >= 3 && input.length <= 9) {
      dispatch(createUser(input));
    }
  };

  return (
    <div className="login__container">
      <h2 className="login__container-title">SNAKE GAME</h2>
      <form
        onSubmit={submitHandler}
        className="login__container-form"
        action="login"
      >
        <input
          type="text"
          placeholder="Set Your NickName"
          onChange={inputHandler}
          name="login"
          value={input}
          className="login__container-form-input"
          autoFocus
          minLength="3"
          maxLength="9"
        />
        <button className="login__container-form-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
