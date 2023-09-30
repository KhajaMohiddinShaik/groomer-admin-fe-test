import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/themes/base/all.css";
import "./DatePicker.css";
import "./DatepickerComponent.css";

const DatepickerComponent = ({ blockSalon, setblockSalon }) => {
  const datepickerRef = useRef(null); // Create a ref to hold a reference to the datepicker element
  const selectedDates = useRef(blockSalon); // Create a ref to hold an array of selected dates

  // useEffect is used for handling side effects in functional components
  useEffect(() => {
    // Get the DOM element for the datepicker using the ref
    const datepickerElement = datepickerRef.current;

    // Initialize the jQuery UI datepicker with desired options
    $(datepickerElement).datepicker({
      showButtonPanel: true,
      dateFormat: "dd/mm/yy",
      changeMonth: true,
      changeYear: true,
      yearRange: "c:c+10",
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      // buttonText: 'Pick Date',
      monthNamesShort: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      showOtherMonths: true,
      firstDay: 1,
      beforeShowDay: function (date) {
        // Format the date as a string
        const dateString = $.datepicker.formatDate("dd/mm/yy", date);

        // Check if the date is selected and apply a CSS class
        const isSelected = selectedDates.current.includes(dateString);
        return [true, isSelected ? "selected-date" : ""];
      },

      onSelect: function (dateText, inst) {
        // Handle date selection
        const index = selectedDates.current.indexOf(dateText);
        if (index === -1) {
          selectedDates.current.push(dateText);
        } else {
          selectedDates.current.splice(index, 1);
        }
        // Clear the selected date and log the selected dates
        $(this).datepicker("setDate", new Date());
        console.log(selectedDates.current);
        let temp = selectedDates.current;
        setblockSalon(temp);
      },
    });

    // Show the datepicker when the component mounts

    $(datepickerElement).datepicker("show");

    // Clean up the datepicker when the component unmounts
    return () => {
      $(datepickerElement).datepicker("destroy");
    };
  }, [blockSalon, setblockSalon]);

  // Render the DatepickerComponent
  return (
    <div id="datepicker-container" className="datepicker-container">
      {/* <div ref={datepickerRef} className="datepicker-input"></div> */}
      <div ref={datepickerRef} id="datepicker"></div>
    </div>
  );
};

export default DatepickerComponent;
