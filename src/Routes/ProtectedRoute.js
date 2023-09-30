import { Navigate } from "react-router-dom";
import { Store } from "../App";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuth] = useContext(Store);
  const salonToken = sessionStorage.getItem("salon_token");

  if (!isAuth || salonToken !== isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
