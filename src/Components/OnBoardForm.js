import "../App.css";
import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Logout from "./Logout";
import Credentials from "./Credentials";
import Franchise from "./Franchise";
import SalonTimings from "./SalonTimings";
import LunchTimings from "./LunchTimings";
import NumSlots from "./NumSlots";
import Photos from "./Photos";
import Services from "./Services";
import Combos from "./Combos";
import Features from "./Features";
import Languages from "./Languages";
import OwnershipDetails from "./OwnershipDetails";
import { useNavigate } from "react-router-dom";
import {
  ToastError,
  ToastSuccess,
  ToastWarning,
} from "../Middlewares/Alertpop";
import Manhood from "./Manhood";
import MoreOption from "./MoreOption";
import Context from "../Context";

function OnBoardForm(props) {
  const [isReadOnly, setIsReadOnly] = useState(props.isReadOnly);
  let { Salondata } = props;
  const navigate = useNavigate();

  const DataSalon = props.Salondata?.one;
  const SalonLocation =
    DataSalon?.["salon_location"]?.["coordinates"].join(", ");

  // State to manage form inputs
  const [inputs, setInputs] = useState({
    // Initialize input fields with data from DataSalon or default values
    username: DataSalon?.salon_username || "name",
    password: DataSalon?.salon_password || "***",
    code: DataSalon?.["salon_code"] || "",
    name: DataSalon?.["salon_name"] || "",
    type: DataSalon?.["salon_type"] || "male",
    address: DataSalon?.["salon_address"] || "",
    location: SalonLocation || "",
    franchise: DataSalon?.["salon_franchise"] || false,
    area: DataSalon?.["salon_area"] || "",
    city: DataSalon?.["salon_city"] || "",
    state: DataSalon?.["salon_state"] || "",
    franchiseSalons: DataSalon?.["salon_franchise_list"] || [""],
    slots_number: parseInt(DataSalon?.["salon_slots"]) || 3,
    opening_time: DataSalon?.["salon_opening_time"] || "09:00 AM",
    closing_time: DataSalon?.["salon_closing_time"] || "06:00 PM",
    lunch_time: DataSalon?.["salon_lunch_time"] || "01:00 PM",
    features: {
      wifi: DataSalon?.["salon_features"]?.["feature_wifi"] || true,
      parking: DataSalon?.["salon_features"]?.["feature_parking"] || false,
      AC: DataSalon?.["salon_features"]?.["feature_AC"] || true,
    },
    languages: {
      hindi: DataSalon?.["salon_languages"]?.["language_hindi"] || true,
      english: DataSalon?.["salon_languages"]?.["language_english"] || false,
      telugu: DataSalon?.["salon_languages"]?.["language_telugu"] || true,
    },
    owner_name: DataSalon?.["salon_owner_name"] || "sumanth vartha",
    owner_mobile: DataSalon?.["salon_owner_mobile"] || "9876543210",
    owner_pancard_number:
      DataSalon?.["salon_owner_pancard_number"] || "234WERT092",
    bank_name: DataSalon?.["salon_bank_name"] || "##### bak",
    bank_account_number:
      DataSalon?.["salon_bank_account_number"] || "3221655498746623",
    bank_IFSC_code: DataSalon?.["salon_bank_IFSC_code"] || "IFSC00123",
  });

  const [isActive, setisActive] = useState(DataSalon?.["salon_isActive"]);
  // Other state variables
  const [serviceCount, setServiceCount] = useState(
    DataSalon?.["salon_services"]?.length || 1
  );
  const [services, setServices] = useState(Salondata?.servicesRev || []);
  const [comboCount, setComboCount] = useState(1);
  const [comboservicecount, setComboServiceCount] = useState(2);
  const [combos, setCombos] = useState(Salondata?.combosRev || []);
  const [shouldUpload, setshouldUpload] = useState(true);
  const [uploadedPhotos, setUploadedPhotos] = useState(
    DataSalon?.["salon_photos"] || []
  );
  const [blockSalon, setblockSalon] = useState(
    DataSalon?.["salon_block_dates"] || []
  );

  // usestate for salon code edit or not
  const [readsalonCode, setreadsalonCode] = useState(false);
  useState(() => {
    if (!DataSalon) {
      const initialServices = Array.from({ length: serviceCount }, () => ({
        name: "",
        discount: "",
        price: "",
        duration: "",
      }));
      setServices(initialServices);
    }
  }, [serviceCount]);

  useState(() => {
    if (!DataSalon) {
      const initialCombos = Array.from({ length: comboCount }, () => ({
        combo_name: `Combo ${comboCount}`,
        services: Array.from({ length: comboservicecount }, () => ""),
        combo_price: "",
        duration: "",
      }));
      setCombos(initialCombos);
    }
  }, [comboCount]);

  useEffect(() => {
    if (isReadOnly) {
      setshouldUpload(false);
    }
  }, [isReadOnly]);

  // salon Code Handle Change
  const salonCodeHandler = async (e) => {
    let key = e.target.value.toUpperCase();
    const name = e.target.name;
    setInputs((values) => ({ ...values, [name]: key }));

    if (key.length === 3) {
      try {
        let headersList = {
          Accept: "*/*",
          Authorization: `Bearer ${sessionStorage.getItem("salon_token")}`,
        };
        let response = await fetch(`${Context}/admin/salon-code?key=${key}`, {
          headers: headersList,
        });

        let data = await response.json();
        if (data.code === 200) {
          setreadsalonCode(true);
          setInputs((values) => ({ ...values, [name]: data.data.salonCode }));
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (key.length > 3) {
      ToastWarning("give only 1st 3 letters for salon code");
    }
  };

  // Handle changes in form input fields
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const allFieldsFilled = services.filter(
      (service) =>
        service.name !== "" &&
        service.discount !== "" &&
        service.price !== "" &&
        service.duration !== "lunch_time"
    );
    // console.log(allFieldsFilled, services);

    // Prepare form data for submission
    var formdata = new FormData();
    for (let arr in inputs) {
      if (
        arr !== "features" &&
        arr !== "languages" &&
        arr !== "opening_time" &&
        arr !== "closing_time" &&
        arr !== "lunch_time" &&
        arr !== "franchiseSalons"
      ) {
        formdata.append(arr, inputs[arr]);
      }
    }
    let x;
    // features and languages
    x = JSON.stringify(inputs.features);
    formdata.append("features", x);
    x = JSON.stringify(inputs.languages);
    formdata.append("languages", x);
    // opening and closing salon timings
    // x = moment(inputs.opening_time, "LT");

    inputs.opening_time[0] === "0"
      ? (x = inputs.opening_time.replace("0", ""))
      : (x = inputs.opening_time);
    formdata.append("opening_time", x);

    inputs.closing_time[0] === "0"
      ? (x = inputs.closing_time.replace("0", ""))
      : (x = inputs.closing_time);
    formdata.append("closing_time", x);

    inputs.lunch_time[0] === "0"
      ? (x = inputs.lunch_time.replace("0", ""))
      : (x = inputs.lunch_time);
    console.log(x, typeof x);
    formdata.append("lunch_time", x);

    // services
    if (inputs.franchise) {
      formdata.append(
        "franchise_salon",
        JSON.stringify(inputs.franchiseSalons)
      );
    }
    formdata.append("service", JSON.stringify(allFieldsFilled));
    formdata.append("combo_service", JSON.stringify(combos));
    // photos
    if (props.search) {
      if (setshouldUpload) {
        formdata.append("should_update_image", shouldUpload);
        uploadedPhotos.forEach((image, index) => {
          formdata.append(`photos`, image);
        });
      }
    } else {
      uploadedPhotos.forEach((image, index) => {
        formdata.append(`photos`, image);
      });
    }
    if (blockSalon.length > 0) {
      formdata.append("block_dates", JSON.stringify(blockSalon));
    }
    if (DataSalon) {
      formdata.append("uuid", DataSalon["salon_uuid"]);
    }
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${sessionStorage.getItem("salon_token")}`,
    };

    if (DataSalon) {
      const response = await fetch(`${Context}/admin/salon/update`, {
        method: "PATCH",
        body: formdata,
        headers: headersList,
      });

      let data = await response.json();
      if (data.code === 202) {
        ToastSuccess(data.message);
        Salondata = null;
        setIsReadOnly(true);
      }
    } else {
      let response = await fetch(`${Context}/admin/add-new-salon`, {
        method: "POST",
        body: formdata,
        headers: headersList,
      });

      let data = await response.json();
      let code = data.code;
      if (code === 500 || code === 406) {
        ToastError(data.message);
        return;
      }
      console.log(data);
      ToastSuccess("successfully created a new salon");
      navigate("/search");
    }
  };

  return (
    <div className="container">
      {!props.search && (
        <>
          <div>
            <Logo />
            <Logout />
          </div>
          <NavBar />
        </>
      )}
      <div>
        <div className="form-group">
          <div
            className="label"
            style={{
              textDecoration: "underline",
              fontWeight: "bold",
              marginBottom: "30px",
              fontSize: "20px",
            }}
          >
            Salon details
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: isReadOnly ? "" : "end",
              width: "440px",
            }}
          >
            {isReadOnly && (
              <button
                onClick={() => setIsReadOnly(false)}
                className="label"
                style={{
                  textAlign: "center",
                  background: "#FF6548",
                  fontWeight: "bold",
                  marginBottom: "30px",
                  fontSize: "17px",
                }}
              >
                Enable Edit
              </button>
            )}
            {!isReadOnly && props.search && (
              <MoreOption
                salonCode={inputs.code}
                isActive={isActive}
                setisActive={setisActive}
              />
            )}
          </div>
        </div>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {/* Render various form components */}
          <Credentials
            inputs={inputs}
            handleChange={handleChange}
            isReadOnly={isReadOnly}
          />
          <div className="form-group">
            <label className="label">Salon Code:</label>
            <div className="input">
              <input
                type="text"
                name="code"
                placeholder="HYD...MUM...DEL"
                value={inputs.code || ""}
                onChange={salonCodeHandler}
                readOnly={isReadOnly ? isReadOnly : readsalonCode}
                disabled={readsalonCode}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Salon Name:</label>
            <div className="input1">
              <input
                style={{ width: "100%" }}
                type="text"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
                size="50"
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Salon Address:</label>
            <div className="input1">
              <textarea
                style={{ width: "100%" }}
                type="text"
                name="address"
                value={inputs.address || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Area:</label>
            <div className="input1">
              <input
                style={{ width: "100%" }}
                type="text"
                name="area"
                value={inputs.area || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">City:</label>
            <div className="input1">
              <input
                style={{ width: "100%" }}
                type="text"
                name="city"
                value={inputs.city || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">State:</label>
            <div className="input1">
              <input
                style={{ width: "100%" }}
                type="text"
                name="state"
                value={inputs.state || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="label">Location:</label>
            <div className="input1">
              <input
                style={{ width: "100%" }}
                type="text"
                name="location"
                value={inputs.location || ""}
                onChange={handleChange}
                readOnly={isReadOnly}
              />
            </div>
          </div>
          <Manhood
            inputs={inputs}
            setInputs={setInputs}
            isReadOnly={isReadOnly}
          />
          <Franchise
            inputs={inputs}
            setInputs={setInputs}
            isReadOnly={isReadOnly}
          />
          <NumSlots
            number={inputs.slots_number}
            inputs={inputs}
            setInputs={setInputs}
            handleChange={handleChange}
            isReadOnly={isReadOnly}
          />
          <SalonTimings
            inputs={inputs}
            setInputs={setInputs}
            isReadOnly={isReadOnly}
          />
          <LunchTimings
            inputs={inputs}
            setInputs={setInputs}
            isReadOnly={isReadOnly}
          />
          <Photos
            uploadedimages={uploadedPhotos}
            setUploadedimages={setUploadedPhotos}
            isReadOnly={isReadOnly}
            shouldUpload={shouldUpload}
            setshouldUpload={setshouldUpload}
            show={props.search}
          />
          <Services
            SalonServices={DataSalon?.["salon_services"]}
            services={services}
            setServices={setServices}
            isReadOnly={isReadOnly}
            serviceCount={serviceCount}
            setServiceCount={setServiceCount}
          />
          <Combos
            ComboServices={DataSalon?.["salon_combo_services"]}
            combos={combos}
            setCombos={setCombos}
            isReadOnly={isReadOnly}
            comboCount={comboCount}
            setComboCount={setComboCount}
            comboservicecount={comboservicecount}
            setComboServiceCount={setComboServiceCount}
          />
          <Features
            inputs={inputs}
            setInputs={setInputs}
            isReadOnly={isReadOnly}
          />
          <Languages
            inputs={inputs}
            setInputs={setInputs}
            isReadOnly={isReadOnly}
          />
          <OwnershipDetails
            inputs={inputs}
            setInputs={setInputs}
            handleChange={handleChange}
            isReadOnly={isReadOnly}
          />
          {props.search && (
            <div className="form-group">
              <div
                className="label"
                style={{
                  textDecoration: "underline",
                  fontWeight: "bold",
                  marginBottom: "30px",
                  fontSize: "20px",
                  marginTop: "20px",
                }}
              >
                Block Salon:
              </div>
              <div
                className="input"
                style={{ marginTop: "40px", marginBottom: "40px" }}
              >
                <DatePicker
                  blockSalon={blockSalon}
                  setblockSalon={setblockSalon}
                />
              </div>
            </div>
          )}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              gap: "80px",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10vh",
            }}
          >
            {!isReadOnly && (
              <button className="submit" type="submit" disabled={isReadOnly}>
                {!props.search ? "Save" : "Save Changes"}
              </button>
            )}
            {!isReadOnly && props.search && (
              <button
                style={{
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  borderRadius: "20px",
                }}
                onClick={() => setIsReadOnly(true)}
              >
                Cancel Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default OnBoardForm;
