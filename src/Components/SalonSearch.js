import "../App.css";
import OnBoardForm from "./OnBoardForm";
import { useContext, useState } from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Logout from "./Logout";
import { Store } from "../App";
import { ToastError } from "../Middlewares/Alertpop";
import Context from "../Context";

function SalonSearch() {
  const [searchon, setSearchOn] = useState(false);
  const [salonCode, setSalonCode] = useState("");
  const [sendData, setsendData] = useState({});
  const [isAuth] = useContext(Store);

  const handleSubmit = async (event) => {
    setSearchOn(true);
    // console.log(salonCode);
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${isAuth}`,
    };

    let response = await fetch(`${Context}/admin/salons?code=${salonCode}`, {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    if (data.code === 404) {
      setSearchOn(false);
      ToastError("Salon not find with id : " + salonCode);
      return;
    }

    // console.log(data);
    const keyMapping = {
      service_name: "name",
      service_discount: "discount",
      service_original_price: "price",
      service_duration: "duration",
      combo_name: "combo_name",
      combo_services_name: "services",
      combo_price: "combo_price",
      combo_duration: "duration",
    };

    const modifiedDictListServices = data.data["salon_services"].map((dict) => {
      const modifiedDict = {};

      for (const key in dict) {
        if (dict.hasOwnProperty(key)) {
          const newKey = keyMapping[key] || key;
          modifiedDict[newKey] = dict[key];
        }
      }

      return modifiedDict;
    });

    // console.log(modifiedDictListServices);

    const modifiedDictListCombos = data.data["salon_combo_services"].map(
      (dict) => {
        const modifiedDict = {};

        for (const key in dict) {
          if (dict.hasOwnProperty(key)) {
            const newKey = keyMapping[key] || key;
            modifiedDict[newKey] = dict[key];
          }
        }

        return modifiedDict;
      }
    );

    // console.log(modifiedDictListCombos, "combos");

    setsendData({
      ...sendData,
      one: data.data,
      servicesRev: modifiedDictListServices,
      combosRev: modifiedDictListCombos,
    });

    // navigate("/admin", {
    //   state: {
    //     Salondata: data.data,
    //     servicesRev: modifiedDictListServices,
    //     combosRev: modifiedDictListCombos,
    //   },
    // });
  };

  return (
    <div className="container">
      <div>
        <Logo />
        <Logout />
      </div>
      <NavBar />
      <div>
        {!searchon && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Salon Code:</label>
              <div className="input">
                <input
                  style={{ marginRight: "4vw" }}
                  type="text"
                  name="SalonCode"
                  value={salonCode}
                  onChange={(event) => setSalonCode(event.target.value)}
                />
                <button
                  className="submit"
                  style={{ paddingRight: "40px", paddingLeft: "40px" }}
                  type="submit"
                >
                  Go
                </button>
              </div>
            </div>
          </form>
        )}

        {searchon && sendData.one && (
          <OnBoardForm
            isReadOnly={true}
            search={true}
            Salondata={sendData.one && sendData}
            upPhoto={false}
          />
        )}
      </div>{" "}
    </div>
  );
}

export default SalonSearch;
