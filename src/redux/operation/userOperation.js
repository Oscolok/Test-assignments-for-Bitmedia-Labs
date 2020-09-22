import axios from "axios";
import { userInfo } from "../actions/userAction";
import { usersList } from "../actions/usersAction";

axios.defaults.baseURL = "http://localhost:4000/users";

export const createUser = (data) => async (dispatch) => {
  try {
    const initialObj = { name: data, level: 1, score: 0 };

    const result = await axios.post("/", initialObj);

    dispatch(userInfo(result.data));
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = ({ _id, name, level, score }) => async (dispatch) => {
  try {
    const result = await axios.put(`/${_id}`, { level, score });
    dispatch(userInfo(result.data));
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const result = await axios.get("/");

    dispatch(usersList(result.data));
  } catch (error) {
    console.log(error);
  }
};
