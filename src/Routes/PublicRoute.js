import { Navigate } from "react-router-dom";
import { Store } from "../App";
import { useContext } from "react";
import { getToken } from "../Context";

const PublicRoute = ({ children }) => {
  const [isAuth] = useContext(Store);
  const token = getToken();

  if (token && isAuth) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PublicRoute;
