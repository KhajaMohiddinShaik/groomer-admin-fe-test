import React, { useState, useEffect, useRef } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "../TimePicker.css";

const Duration = ({ value, index, setServices, setCombos, isCombos }) => {
  const [showpicker, setshowpicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState("01");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [selectedTime, setSelectedTime] = useState(
    value || `${selectedHour} hr ${selectedMinute} min`
  );

  // Arrays for hours and minutes
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  // Function to toggle the time picker visibility
  const togglePicker = () => {
    setshowpicker(!showpicker);
  };

  // Function to handle time selection
  const handleTimeSelect = () => {
    const time = `${selectedHour} hr ${selectedMinute} min`;
    setSelectedTime(time);
    if (isCombos) {
      // Update combo duration if used in Combos component
      setCombos((combo) => {
        const updatedCombos = [...combo];
        updatedCombos[index].duration = time;
        return updatedCombos;
      });
    } else {
      // Update service duration if used in Services component
      setServices((service) => {
        const updatedServices = [...service];
        updatedServices[index].duration = time;
        return updatedServices;
      });
    }
    setshowpicker(false);
  };

  // Create a ref to detect clicks outside the time picker
  const dropdownRef = useRef(null);

  // Effect to handle clicks outside the time picker
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setshowpicker(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="time-picker-container" ref={dropdownRef}>
      <div className="time-picker-input">
        <input
          style={{
            width: "90px",
            background: "rgba(123, 123, 123, 0.25)",
            textAlign: "center",
            padding: "5px 5px",
            fontSize: "13px",
          }}
          type="text"
          value={selectedTime}
          readOnly
          placeholder="Select Time"
        />
        <span className="time-picker-icon" onClick={togglePicker}>
          <AccessTimeIcon style={{ fontSize: "20px" }} />
        </span>
      </div>
      {showpicker && (
        <div className="time-picker-dropdown">
          <div className="time-picker-partitions">
            <div className="picker-column">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={selectedHour === hour ? "selected" : ""}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </div>
              ))}
            </div>
            <div className="picker-column">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={selectedMinute === minute ? "selected" : ""}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute}
                </div>
              ))}
            </div>
          </div>
          <button className="time-picker-ok-btn" onClick={handleTimeSelect}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default Duration;
