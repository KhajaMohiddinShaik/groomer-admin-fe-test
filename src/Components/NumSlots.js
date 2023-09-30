import "../App.css";
import React, { useEffect, useState } from "react";

function NumSlots({ number, inputs, setInputs, handleChange, isReadOnly }) {
  const [customValue, setcustomValue] = useState(inputs?.slots_number || "");

  useEffect(() => {
    if (customValue <= 4) {
      setcustomValue("");
    }
  }, [customValue, setcustomValue]);

  // Handle the selection of the number of slots
  const handleNumberSlots = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    if (inputs.slots_number === selectedValue) {
      // If the selected value is the same as the current one, set it to 0 (unselected)
      setInputs((prevState) => ({ ...prevState, slots_number: 0 }));
    }
    // Otherwise, set the selected value
    else
      setInputs((prevState) => ({ ...prevState, slots_number: selectedValue }));
    // Clear the custom number input
    document.getElementById("slots_number").value = "";
  };

  return (
    // Number of slots selection
    <div className="form-group">
      <label className="label">Number of slots:</label>
      <div
        className="input"
        style={{ display: "flex", flexDirection: "row", gap: "20px" }}
      >
        {/* Buttons for selecting predefined numbers */}
        <button
          type="button"
          value={1}
          onClick={handleNumberSlots}
          className={inputs.slots_number === 1 ? "active" : ""}
          disabled={isReadOnly}
        >
          1
        </button>
        <button
          type="button"
          value={2}
          onClick={handleNumberSlots}
          className={inputs.slots_number === 2 ? "active" : ""}
          disabled={isReadOnly}
        >
          2
        </button>
        <button
          type="button"
          value={3}
          onClick={handleNumberSlots}
          className={inputs.slots_number === 3 ? "active" : ""}
          disabled={isReadOnly}
        >
          3
        </button>
        <button
          type="button"
          value={4}
          onClick={handleNumberSlots}
          className={inputs.slots_number === 4 ? "active" : ""}
          disabled={isReadOnly}
        >
          4
        </button>
        {/* Input field for entering a custom number */}
        <input
          id="slots_number"
          type="number"
          min="5"
          placeholder="Enter custom number"
          value={customValue}
          onChange={(event) => {
            setcustomValue(event.target.value);
            setInputs((prevState) => ({
              ...prevState,
              slots_number: parseInt(event.target.value),
            }));
          }}
          readOnly={isReadOnly}
        />
      </div>
    </div>
  );
}

export default NumSlots;
