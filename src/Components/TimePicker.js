import React, { useState, useEffect, useRef } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../TimePicker.css';

const TimePicker = ({ timeperiods, inputs, setInputs, label }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedHour, setSelectedHour] = useState('01');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(timeperiods[0]);
    const [selectedTime, setSelectedTime] = useState(inputs[label] || `${selectedHour}:${selectedMinute} ${selectedTimePeriod}`);

    // Arrays to represent hours, minutes, and time periods
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const timePeriods = timeperiods;

    // Function to toggle the visibility of the time picker
    const togglePicker = () => {
        setShowPicker(!showPicker);
    };

    // Function to handle selecting a time
    const handleTimeSelect = () => {
        const time = `${selectedHour}:${selectedMinute} ${selectedTimePeriod}`;
        setSelectedTime(time);
        setInputs((input) => ({ ...input, [label]: time }));
        // setOpeningTime(time);
        console.log(time);
        console.log(label);
        // console.log(inputs);
        setShowPicker(false);
    };

    // Function to handle clicks outside the time picker to close it
    const handleCompleteDropdownClick = () => {
        setShowPicker(false);
    };

    const dropdownRef = useRef(null); // Ref to track clicks outside the time picker

    // UseEffect to add an event listener for clicks outside the time picker
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    return (
        <div className="time-picker-container" ref={dropdownRef}>
            <div className="time-picker-input">
                <input
                    type="text"
                    value={selectedTime}
                    readOnly
                    placeholder="Select Time"
                    onClick={handleCompleteDropdownClick}
                />
                <span className="time-picker-icon" onClick={togglePicker}>
                    <AccessTimeIcon style={{ fontSize: "20px" }} />
                </span>
            </div>
            {showPicker && (
                <div className="time-picker-dropdown">
                    <div className='time-picker-partitions'>
                        <div className="picker-column">
                            {hours.map(hour => (
                                <div
                                    key={hour}
                                    className={selectedHour === hour ? 'selected' : ''}
                                    onClick={() => setSelectedHour(hour)}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>
                        <div className="picker-column">
                            {minutes.map(minute => (
                                <div
                                    key={minute}
                                    className={selectedMinute === minute ? 'selected' : ''}
                                    onClick={() => setSelectedMinute(minute)}
                                >
                                    {minute}
                                </div>
                            ))}
                        </div>
                        <div className="picker-column">
                            {timePeriods.map(period => (
                                <div
                                    key={period}
                                    className={selectedTimePeriod === period ? 'selected' : ''}
                                    onClick={() => setSelectedTimePeriod(period)}
                                >
                                    {period}
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

export default TimePicker;
