import React, { useEffect, useState, useContext } from "react";
import { Store } from "../App";
import Logout from "../Components/Logout";
import "../App.css";
import Logo from "../Components/Logo";
import NavBar from "../Components/NavBar";
import Loader from "../Components2/Loader";
import Context from "../Context";

const AllSalonslist = () => {
  const [isAuth] = useContext(Store);
  const [searchValue, setsearchValue] = useState("");
  const [loader, setloader] = useState(true);
  const [Data, setData] = useState([]);
  const [filtered, setfiltered] = useState([]);

  const navigate = (id) => {
    window.open(`http://localhost:3000/salons/${id}`, "_blank");
  };

  const filterSalon = (e) => {
    let search = e.target.value;
    setsearchValue(search);
    if (search === "") {
      setfiltered(Data);
      return;
    }

    let update = Data.filter(
      (item) =>
        item.salon_code.toLowerCase().includes(search.toLowerCase()) ||
        item.salon_name.toLowerCase().includes(search.toLowerCase())
    );
    setfiltered(update);
  };

  useEffect(() => {
    const GetAllSalonsList = async () => {
      setloader(true);
      let headersList = {
        Accept: "*/*",
        Authorization: `Bearer ${isAuth}`,
      };

      let response = await fetch(`${Context}/admin/all-salons`, {
        method: "GET",
        headers: headersList,
      });

      let x = await response.json();

      setData(x.data);
      setfiltered(x.data);
      setloader(false);
    };

    GetAllSalonsList();
  }, []);
  return (
    <div className="container">
      <div>
        <Logo />
        <Logout />
      </div>
      <NavBar />

      <div
        style={{
          width: "52%",
          margin: "0 auto",
          overflow: "auto",
        }}
      >
        <div className="dropdown-options">
          <div className="form-group">
            <label className="label wt-100">Filter Salons:</label>
            <div className="input">
              <input
                style={{ marginRight: "4vw" }}
                type="text"
                name="SalonCode"
                placeholder="salonCode..(or)..salonName.."
                autoComplete="off"
                value={searchValue}
                onChange={filterSalon}
              />
            </div>
          </div>
          {loader ? (
            <Loader />
          ) : (
            filtered.map((salon) => (
              <div key={salon.salon_uuid} className="dropdown-option">
                <div
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => navigate(salon.salon_uuid)}
                >
                  {salon.salon_uuid}{" "}
                </div>
                <div>{salon.salon_code}</div>
                <div>{salon.salon_name}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSalonslist;
