import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Stats.scss";

const Start = () => {
  const topUsers = useSelector((state) => state.users);

  return (
    <div className="stats__container">
      <h2 className="stats__container-title">TOP SCORES</h2>

      <table
        className="stats__container-table"
        width="250"
        rules="all"
        border="1"
      >
        <thead className="stats__container-table-head">
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody className="stats__container-table-body">
          {topUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.score}</td>
              <td>{user._id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="stats__container-btn">
        Go back
      </Link>
    </div>
  );
};

export default Start;
