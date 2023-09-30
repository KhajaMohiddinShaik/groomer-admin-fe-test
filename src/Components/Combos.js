import "../App.css";

function Combos({
  ComboServices,
  combos,
  setCombos,
  isReadOnly,
  comboCount,
  setComboCount,
  comboservicecount,
  setComboServiceCount,
}) {
  // Function to delete a combo from the combos list
  const handleDeleteCombo = (index) => {
    const updatedCombos = [...combos];
    updatedCombos.splice(index, 1);
    setCombos(updatedCombos);
  };

  // Function to add a new combo to the combos list
  const handleAddCombo = () => {
    const newCombo = {
      combo_name: `Combo ${comboCount + 1}`,
      services: Array.from({ length: comboservicecount }, () => ""),
      combo_price: "",
      duration: "",
    };
    setCombos([...combos, newCombo]);
    setComboCount(comboCount + 1);
  };

  // Function to handle changes in service names within a combo
  const handleServiceChangeCombo = (event, comboIndex, serviceIndex) => {
    const updatedCombos = [...combos];
    updatedCombos[comboIndex].services[serviceIndex] = event.target.value;
    setCombos(updatedCombos);
  };

  // Function to handle changes in combo prices
  const handleComboPriceChange = (event, comboIndex) => {
    const updatedCombos = [...combos];
    updatedCombos[comboIndex].combo_price = event.target.value;
    setCombos(updatedCombos);
  };
  // Function to handle changes in combo duration
  const handleComboDurationChange = (event, comboIndex) => {
    const updatedCombos = [...combos];
    updatedCombos[comboIndex].duration = event.target.value;
    setCombos(updatedCombos);
  };

  // Function to handle changes in combo names
  const handleComboNameChange = (event, comboIndex) => {
    const updatedCombos = [...combos];
    updatedCombos[comboIndex].combo_name = event.target.value;
    setCombos(updatedCombos);
  };

  // Function to add a new service to a combo
  const handleAddServiceCombo = (comboIndex) => {
    const updatedCombos = [...combos];
    updatedCombos[comboIndex].services.push("");
    setCombos(updatedCombos);
    setComboServiceCount(comboservicecount + 1);
  };

  // Function to delete a service from a combo
  const handleDeleteServiceCombo = (comboIndex, serviceIndex) => {
    const updatedCombos = [...combos];
    updatedCombos[comboIndex].services.splice(serviceIndex, 1);
    setCombos(updatedCombos);
  };

  // Render the Combos component
  return (
    <>
      <div className="form-group">
        <label className="label">Combo Services:</label>
        <div className="input">
          {combos.map((combo, comboIndex) => (
            <div
              key={comboIndex}
              className="combo"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <input
                style={{ background: "none", padding: "0px", fontSize: "16px" }}
                size="15"
                type="text"
                name="username"
                onChange={(event) => handleComboNameChange(event, comboIndex)}
                value={combo.combo_name}
                readOnly={isReadOnly}
              />
              {/* Combo {comboIndex + 1}: */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  width: "70vw",
                }}
              >
                <span style={{ marginRight: "3vw" }}>Services:</span>
                <div>
                  {combo.services.map((service, serviceIndex) => (
                    // <div key={serviceIndex}>
                    <label
                      key={serviceIndex}
                      className="combo-service"
                      style={{ marginLeft: "19px", position: "relative" }}
                    >
                      <input
                        style={{ marginTop: "3px" }}
                        type="text"
                        value={service}
                        placeholder="Service name"
                        onChange={(event) =>
                          handleServiceChangeCombo(
                            event,
                            comboIndex,
                            serviceIndex
                          )
                        }
                        readOnly={isReadOnly}
                      />
                      {!isReadOnly && (
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() =>
                            handleDeleteServiceCombo(comboIndex, serviceIndex)
                          }
                          style={{
                            position: "absolute",
                            right: "5px",
                            top: "65%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          &times;
                        </button>
                      )}
                    </label>
                    // </div>
                  ))}

                  <button
                    style={{ marginLeft: "19px", marginTop: "3px" }}
                    type="button"
                    onClick={() => handleAddServiceCombo(comboIndex)}
                    disabled={isReadOnly}
                  >
                    +
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <label>
                  <span style={{ marginRight: "2vw" }}>Combo Price:</span>
                  <input
                    type="text"
                    value={combo.combo_price}
                    onChange={(event) =>
                      handleComboPriceChange(event, comboIndex)
                    }
                    readOnly={isReadOnly}
                  />
                </label>
                <label
                  style={{
                    marginLeft: "20px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <span>Duration:</span>
                  <span style={{ marginLeft: "20px" }}>
                    <input
                      type="text"
                      size="16"
                      value={combo.duration}
                      onChange={(event) =>
                        handleComboDurationChange(event, comboIndex)
                      }
                      readOnly={isReadOnly}
                    />
                  </span>{" "}
                  {/* <input
                                        type="text"
                                        value={combo.duation}
                                        onChange={(event) =>
                                            handleComboPriceChange(event, comboIndex)
                                        }
                                        readOnly={isReadOnly}
                                    /> */}
                </label>
                {!isReadOnly && (
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleDeleteCombo(comboIndex)}
                  >
                    &times;
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button type="button" onClick={handleAddCombo} disabled={isReadOnly}>
          ADD COMBO
        </button>
      </div>
    </>
  );
}

export default Combos;
