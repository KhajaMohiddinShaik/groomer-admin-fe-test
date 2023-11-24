import React, { useContext, useState } from "react";
import "./App.css";
import logo from "./images/groomerpsd.svg";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { Store } from "./App";
import { ToastError, ToastWarning } from "./Middlewares/Alertpop";
import Context, { setToken } from "./Context";
import Loader from "./Components2/Loader";

function Home() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [, setisAuth] = useContext(Store);

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    // Extract the username and password from the form elements
    const { username, password } = event.target.elements;

    if (username.value === "" || password.value === "") {
      ToastWarning("Fields cannot be an empty");
      return;
    }

    // Define headers for the HTTP request
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    // Create the request body in JSON format
    let bodyContent = JSON.stringify({
      username: username.value,
      password: password.value,
    });

    // Send a POST request to the server for login
    let response = await fetch(`${Context}/admin/login`, {
      method: "POST",
      mode: "cors",
      body: bodyContent,
      headers: headersList,
    });

    // Parse the response as JSON
    let data = await response.json();
    let code = data.code;
    if (code === 401 || code === 404 || code === 406) {
      ToastError(data.message);
      return;
    }

    // If login is successful, navigate to the '/admin' route
    if (data.message === "Logged in successfully") {
      setToken(data.data.token);
      setisAuth(data.data.token);
      setloading(true);
      navigate("/admin");
    }
  };

  // Render the Home component
  return (
    <div id="containerhome">
      <div className="box" id="bluebox">
        <img src={logo} alt="Logo" className="logobig" />
      </div>

      <div className="box" id="redbox">
        <form
          style={{ display: "flex", flexDirection: "row", gap: "5vw" }}
          onSubmit={handleSubmit}
        >
          <div>
            <input type="text" name="username" placeholder="UserName" />
          </div>
          <div>
            <input type="text" name="password" placeholder="Password" />
          </div>
          {loading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              value="Login"
              style={{
                backgroundImage: "url(/images/login.svg)",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Home;
