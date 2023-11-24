import React, { useEffect, useState } from "react";
import "../App.css";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Logout from "./Logout";
import Loader, { ButtonLoader } from "../Components2/Loader";
import Context, { getToken } from "../Context";
import { ToastError, ToastSuccess } from "../Middlewares/Alertpop";

export const SlotGeneration = () => {
  const [gen7code, setgen7code] = useState("");
  const [recomendedcode, setrecomendedcode] = useState("");
  const [city, setcity] = useState("Hyderabad");
  const [listRecomendation, setlistRecomendation] = useState([
    {
      salon_uuid: "123454",
      salon_code: "HYD",
    },
  ]);
  const [loaders, setloaders] = useState({
    sevenDay: false,
    oneDay: false,
    addRecommended: false,
    searchRecommended: false,
  });

  //   TODO : seven day slot genreation api
  const createSevenDaySlotHandler = async (event) => {
    event.preventDefault();
    if (gen7code === "") {
      ToastError("enter the salon code");
      return;
    }
    setloaders({ ...loaders, sevenDay: true });
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
      "Content-type": "application/json",
    };
    let body = JSON.stringify({ salon_code: gen7code });
    let response = await fetch(`${Context}/admin/generateSlotOnBoard`, {
      method: "POST",
      body,
      headers: headersList,
    });
    let data = await response.json();
    if (data.code === 201) {
      ToastSuccess(data.message);
      setloaders({ ...loaders, sevenDay: false });
    }
    if (data.code === 404) {
      ToastError(data.message);
      setloaders({ ...loaders, sevenDay: false });
    }
  };

  //   TODO : daily slot for all salons
  const createOneDaySlotHandler = async () => {
    setloaders({ ...loaders, oneDay: true });
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
    };
    let response = await fetch(`${Context}/admin/generateDailySlots`, {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    if (data.code === 201) {
      ToastSuccess(data.message);
      setloaders({ ...loaders, oneDay: false });
    }
  };

  // TODO : add salon to recomendation
  const addRecomendationHandler = async (event) => {
    event.preventDefault();
    if (recomendedcode === "") {
      ToastError("enter the salon code");
      return;
    }
    setloaders({ ...loaders, addRecommended: true });
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
      "Content-type": "application/json",
    };
    let body = JSON.stringify({ salon_code: recomendedcode });
    let response = await fetch(`${Context}/admin/toggle-recommended`, {
      method: "PATCH",
      body,
      headers: headersList,
    });
    let data = await response.json();
    if (data.code === 200) {
      ToastSuccess(data.message);
      setloaders({ ...loaders, addRecommended: false });
      GetRecommendedSalons();
    }
    if (data.code === 404) {
      ToastError(data.message);
      setloaders({ ...loaders, addRecommended: false });
    }
  };

  const GetRecommendedSalons = async () => {
    setloaders({ ...loaders, searchRecommended: true });
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
    };
    let response = await fetch(
      `${Context}/admin/recommended-salon-code?city=${city}`,
      {
        method: "GET",
        headers: headersList,
      }
    );
    let data = await response.json();
    if (data.code === 200) {
      setlistRecomendation(data.data);
      setloaders({ ...loaders, searchRecommended: false });
    }
    if (data.code === 404) {
      ToastError(data.message);
      setloaders({ ...loaders, searchRecommended: false });
    }
  };

  const searchByCity = (e) => {
    e.preventDefault();
    if (city === "") {
      ToastError("enter the salon code");
      return;
    }
    GetRecommendedSalons();
  };

  // TODO : deleting a salon from the list
  const DeleteRecomendataion = async (id) => {
    setloaders({ ...loaders, searchRecommended: true });
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${getToken()}`,
      "Content-type": "application/json",
    };
    let body = JSON.stringify({ salon_code: id });
    let response = await fetch(`${Context}/admin/toggle-recommended`, {
      method: "PATCH",
      body,
      headers: headersList,
    });
    let data = await response.json();
    if (data.code === 200) {
      ToastSuccess(data.message);
      setloaders({ ...loaders, searchRecommended: false });
      let update = listRecomendation.filter((item) => item.salon_code !== id);
      setlistRecomendation(update);
    }
    if (data.code === 404) {
      ToastError(data.message);
      setloaders({ ...loaders, searchRecommended: false });
    }
  };

  useEffect(() => {
    GetRecommendedSalons();
  }, []);

  return (
    <div className="container">
      <div>
        <Logo />
        <Logout />
      </div>
      <NavBar />
      <div>
        <form onSubmit={createSevenDaySlotHandler}>
          <h3 className="slotControl">Seven days slot generation :-</h3>
          <div className="form-group">
            <label className="label wt-100">Salon Code:</label>
            <div className="input">
              <input
                style={{ marginRight: "4vw" }}
                type="text"
                name="SalonCode"
                placeholder="HYD1...DEL1.."
                value={gen7code}
                onChange={(event) =>
                  setgen7code(event.target.value.toUpperCase())
                }
              />
              {loaders.sevenDay ? (
                <ButtonLoader />
              ) : (
                <button
                  className="submit"
                  style={{ paddingRight: "40px", paddingLeft: "40px" }}
                  type="submit"
                >
                  Create 7 Days
                </button>
              )}
            </div>
          </div>
        </form>

        <h3 className="slotControl">One days slot generation :-</h3>
        <div className="slotControl">
          {loaders.oneDay ? (
            <ButtonLoader />
          ) : (
            <button
              className="submit"
              style={{ paddingRight: "40px", paddingLeft: "40px" }}
              onClick={createOneDaySlotHandler}
            >
              Create 1 Day
            </button>
          )}
        </div>
      </div>

      <div className="container">
        <h3 className="slotControl">Show Recommanded Salons :-</h3>
        <form onSubmit={addRecomendationHandler}>
          <div className="form-group">
            <label className="label wt-100">Salon Code:</label>
            <div className="input">
              <input
                style={{ marginRight: "4vw" }}
                type="text"
                name="SalonCode"
                placeholder="HYD1...DEL1.."
                value={recomendedcode}
                onChange={(event) =>
                  setrecomendedcode(event.target.value.toLocaleUpperCase())
                }
              />
              {loaders.addRecommended ? (
                <ButtonLoader />
              ) : (
                <button
                  className="submit"
                  style={{ paddingRight: "40px", paddingLeft: "40px" }}
                  type="submit"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </form>
        <form onSubmit={searchByCity}>
          <div className="form-group">
            <label className="label wt-100">City:</label>
            <div className="input">
              <input
                style={{ marginRight: "4vw" }}
                type="text"
                name="SalonCode"
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
              <button
                className="submit"
                style={{ paddingRight: "40px", paddingLeft: "40px" }}
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="slotControl">
          <div class="main-box">
            {loaders.searchRecommended ? (
              <Loader />
            ) : (
              listRecomendation.map((item) => (
                <div class="inner-box" key={item.salon_uuid}>
                  {item.salon_code}
                  <span
                    className="closeIcon"
                    onClick={() => DeleteRecomendataion(item.salon_code)}
                  >
                    X
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
