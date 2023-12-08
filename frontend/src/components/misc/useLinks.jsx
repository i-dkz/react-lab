// useLinks.jsx
import useBoundStore from "../../store/Store";
import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const useLinks = () => {
  const { logoutService, user } = useBoundStore((state) => state);

  const items = !user
    ? [
        <NavLink className={classes.link} end to="/">
          Home
        </NavLink>,
        <NavLink className={classes.link} to="/login">
          Login
        </NavLink>,
      ]
    : [
        <NavLink className={classes.link} end to="/posts">
          Posts
        </NavLink>,
        <NavLink end to="/posts/create">
          Create
        </NavLink>,
        <NavLink onClick={logoutService} to="/">
          Logout
        </NavLink>,
      ];

  return items;
};

export default useLinks;
