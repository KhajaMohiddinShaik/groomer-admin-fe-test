import '../App.css'
import React, { useState } from "react";

const Dropdown = ({ options, selectedValues, onSelection }) => {
    // Create state to manage the open/closed state of the dropdown
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Function to toggle the dropdown open/closed state
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Function to handle salon selection and close the dropdown
    const handleSalonSelection = (salonCode) => {
        onSelection(salonCode);
        toggleDropdown();
    };

    return (
        <div className={`dropdown-container ${dropdownOpen ? "open" : ""}`}>
            <button className="dropdown-button" onClick={toggleDropdown}>
                Select Salons
            </button>
            <div className="dropdown-list">
                {/* Render the dropdown list when it's open */}
                {dropdownOpen && (
                    <table className="salon-table">
                        <tbody>
                            {options.map((salon) => (
                                <tr
                                    key={salon.SalonCode}
                                    className={`dropdown-option ${selectedValues.includes(salon.SalonCode) ? "selected" : ""}`}
                                    onClick={() => handleSalonSelection(salon.SalonCode)}
                                >
                                    <td>{salon.SalonCode}</td>
                                    <td>{salon.SalonName}</td>
                                    <td className="tick-mark">{selectedValues.includes(salon.SalonCode) && <span>&#10003;</span>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Dropdown;
