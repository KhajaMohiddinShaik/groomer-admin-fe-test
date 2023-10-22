import { useContext } from "react";
import "../App.css";
import LogoutR from "../images/LogoutRounded.svg";
import "./Logout.css";
import { NavLink } from "react-router-dom";
import { Store } from "../App";
import { removeToken } from "../Context";

function Logout() {
  const [, setisAuth] = useContext(Store);

  const logutFunct = () => {
    removeToken();
    setisAuth(null);
  };

  return (
    <NavLink to="/" onClick={logutFunct}>
      <div className="logout">
        Logout
        <img src={LogoutR} alt="logout" />
      </div>
    </NavLink>
  );
}

export default Logout;
