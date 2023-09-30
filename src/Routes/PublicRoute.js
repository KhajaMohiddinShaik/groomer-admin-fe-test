import { Navigate } from "react-router-dom";
import { Store } from "../App";
import { useContext } from "react";

const PublicRoute = ({ children }) => {
  const [isAuth] = useContext(Store);

  if (sessionStorage.getItem("salon_token") && isAuth) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default PublicRoute;
