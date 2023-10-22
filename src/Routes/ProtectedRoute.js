import { Navigate } from "react-router-dom";
import { Store } from "../App";
import { useContext } from "react";
import { getToken } from "../Context";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setisAuth] = useContext(Store);
  const salonToken = getToken();

  if (!isAuth || salonToken !== isAuth) {
    if (!isAuth && salonToken) {
      setisAuth(salonToken);
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectedRoute;
