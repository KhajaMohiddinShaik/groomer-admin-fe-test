import "../App.css";
import React, { useState, useContext } from "react";
import { Store } from "../App";

function Franchise({ inputs, setInputs, isReadOnly }) {
  // Data for salon options (Sample data)
  const [isAuth] = useContext(Store);

  const [Data, setData] = useState([]);

  // const Data = [
  //     { SalonCode: "HYD001", SalonName: "Hairstyles" },
  //     { SalonCode: "HYD002", SalonName: "Hairstyles" },
  //     { SalonCode: "HYD003", SalonName: "Hairstyles" },
  //     { SalonCode: "HYD004", SalonName: "Hairstyles" },
  //     { SalonCode: "HYD005", SalonName: "Hairstyles" },
  //     { SalonCode: "HYD006", SalonName: "Hairstyles" },
  // ]

  // Styles for the dropdown
  const dropdownStyles = {
    position: "absolute",
    marginTop: "5px",
    padding: "20px",
    background: "#323030",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    zIndex: "1",
    display: "none",
    borderRadius: "20px",
  };

  // Styles for the open dropdown
  const openDropdownStyles = {
    display: "block",
  };

  // State variables to manage franchise selection, salon search, and dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered salon options based on search term
  const filteredSalons = Data.filter((salon) =>
    salon.SalonCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle franchise selection change
  const handleFranchiseChange = (value) => {
    if (value === false) {
      setInputs((values) => ({ ...values, franchiseSalons: [""] }));
    }
  };

  // Get all salons api
  const GetAllSalonsList = async () => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${isAuth}`,
    };

    let response = await fetch(`http://127.0.0.1:8000/admin/all-salons`, {
      method: "GET",
      headers: headersList,
    });

    let { data } = await response.json();
    let tempData = data.map((item) => {
      return {
        SalonCode: item.salon_code,
        SalonName: item.salon_name,
        Salonuuid: item.salon_uuid,
      };
    });

    setData(...Data, tempData);
  };
  // Function to handle franchise selection (Yes/No)
  const handleFranchiseChanges = (event) => {
    let value = event.target.value;
    if (value === "yes") {
      setInputs((values) => ({ ...values, franchise: true }));
      value = true;

      GetAllSalonsList();
    } else {
      value = false;
      setData([]);
      setInputs({ ...inputs, [inputs.franchiseSalons]: [] });
      setInputs((values) => ({ ...values, franchise: false }));
    }
    handleFranchiseChange(value);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle deletion of a selected salon
  const handleDeleteSalon = (index) => {
    const updatedSalonCodes = [...inputs.franchiseSalons];
    updatedSalonCodes.splice(index, 1);
    setInputs((values) => ({ ...values, franchiseSalons: updatedSalonCodes }));
  };

  // Function to handle changes in salon input
  const handleSalonInputChange = (event, index) => {
    const updatedFranchiseSalons = [...inputs.franchiseSalons];
    updatedFranchiseSalons[index] = event.target.value;
    setInputs((values) => ({
      ...values,
      franchiseSalons: updatedFranchiseSalons,
    }));
  };

  // Function to handle salon selection/deselection
  const handleSalonSelection = (salonCode) => {
    const isSelected = inputs.franchiseSalons.includes(salonCode);
    let updatedFranchiseSalons = [...inputs.franchiseSalons];

    if (isSelected) {
      updatedFranchiseSalons = updatedFranchiseSalons.filter(
        (code) => code !== salonCode
      );
    } else {
      const emptyIndex = updatedFranchiseSalons.findIndex(
        (code) => code === ""
      );
      if (emptyIndex !== -1) {
        updatedFranchiseSalons[emptyIndex] = salonCode;
      } else {
        updatedFranchiseSalons.push(salonCode);
      }
    }

    setInputs((values) => ({
      ...values,
      franchiseSalons: updatedFranchiseSalons,
    }));
  };

  return (
    <div className="form-group">
      <label className="label">Franchise salon:</label>
      {/* Buttons for franchise selection (Yes/No) */}
      <div className="input1">
        <button
          style={{ marginRight: "20px" }}
          type="button"
          name="franchise"
          value="yes"
          onClick={handleFranchiseChanges}
          className={inputs.franchise === true ? "active" : ""}
          disabled={isReadOnly || inputs.franchise ? true : false}
        >
          Yes
        </button>
        <button
          type="button"
          name="franchise"
          value="no"
          onClick={handleFranchiseChanges}
          className={inputs.franchise === false ? "active" : ""}
          disabled={isReadOnly}
        >
          No
        </button>
        {/* Dropdown for selecting franchise salons */}
        {inputs.franchise === true && (
          <div style={{ float: "right" }}>
            <div style={{ flex: 1 }}>
              <button
                type="button"
                className="dropdown-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                disabled={isReadOnly}
              >
                ADD SALON
              </button>
              <div
                className="dropdown"
                style={
                  dropdownOpen
                    ? { ...dropdownStyles, ...openDropdownStyles }
                    : dropdownStyles
                }
              >
                <div className="dropdown-search">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search salonCode..."
                  />
                </div>
                <div className="dropdown-options">
                  {filteredSalons.map((salon) => (
                    <div
                      key={salon.SalonCode}
                      className={`dropdown-option ${
                        inputs.franchiseSalons.includes(salon.Salonuuid)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSalonSelection(salon.Salonuuid)}
                    >
                      <div>{salon.SalonCode}</div>
                      <div>{salon.SalonName}</div>
                      {inputs.franchiseSalons.includes(salon.Salonuuid) && (
                        <div className="tick-mark">&#10003;</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {inputs.franchise === true &&
          inputs.franchiseSalons.map((salonCode, index) => {
            if (Data.length === 0) {
              GetAllSalonsList();
            }
            let sal_name =
              Data && Data.find((item) => item.Salonuuid === salonCode);
            return (
              <div
                className="fsalon"
                key={index}
                style={{ paddingTop: "10px" }}
              >
                <label>
                  {`Salon ${index + 1}`}:
                  <input
                    style={{ marginLeft: "7vw" }}
                    type="text"
                    name="franchiseSalons"
                    value={sal_name?.SalonCode || ""}
                    onChange={(event) => handleSalonInputChange(event, index)}
                    readOnly={true}
                  />
                  {!isReadOnly && (
                    <button
                      className="delete-button"
                      type="button"
                      onClick={() => handleDeleteSalon(index)}
                    >
                      &times;
                    </button>
                  )}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Franchise;
