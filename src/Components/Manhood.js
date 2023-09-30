import "../App.css";
import React from "react";

function Manhood({ inputs, setInputs, isReadOnly }) {
  const handleMahoodChanges = (category) => {
    setInputs((prevState) => ({ ...prevState, type: category }));
  };
  return (
    <div className="form-group">
      <label className="label">Manhood:</label>
      <div
        className="input"
        style={{ display: "flex", flexDirection: "row", gap: "20px" }}
      >
        {/* Buttons for selecting predefined numbers */}
        <button
          type="button"
          value={"male"}
          onClick={() => handleMahoodChanges("male")}
          className={inputs.type === "male" ? "active" : ""}
          disabled={isReadOnly}
        >
          Man
        </button>
        <button
          type="button"
          value={"female"}
          onClick={() => handleMahoodChanges("female")}
          className={inputs.type === "female" ? "active" : ""}
          disabled={isReadOnly}
        >
          Women
        </button>
        <button
          type="button"
          value={"unisex"}
          onClick={() => handleMahoodChanges("unisex")}
          className={inputs.type === "unisex" ? "active" : ""}
          disabled={isReadOnly}
        >
          Both
        </button>
      </div>
    </div>
  );
}

export default Manhood;
