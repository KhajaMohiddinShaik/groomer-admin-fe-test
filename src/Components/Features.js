import "../App.css";

function Features({ inputs, setInputs, isReadOnly }) {
  // Function to handle changes in feature selection
  const handleFeatureChange = (event) => {
    const selectedFeature = event.target.value;
    // console.log(selectedFeature);

    // Update the inputs state with the selected feature
    setInputs((prevInputs) => ({
      ...prevInputs,
      features: {
        ...prevInputs.features,
        [selectedFeature]: !prevInputs.features[selectedFeature],
      },
    }));
  };

  //   console.log(inputs.features);

  return (
    <div className="form-group">
      <label className="label">Features:</label>
      <div className="input">
        <div className="checkbox-group">
          {/* Checkbox input for Wi-Fi */}
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="wifi"
              checked={inputs.features["wifi"]}
              onChange={handleFeatureChange}
              disabled={isReadOnly}
            />
            <span className="checkbox-custom"></span>
            Wi-Fi
          </label>
        </div>
        <div className="checkbox-group">
          {/* Checkbox input for Car Parking */}
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="parking"
              checked={inputs.features["parking"]}
              onChange={handleFeatureChange}
              disabled={isReadOnly}
            />
            <span className="checkbox-custom"></span>
            Car Parking
          </label>
        </div>
        <div className="checkbox-group">
          {/* Checkbox input for AC */}
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="AC"
              checked={inputs.features["AC"]}
              onChange={handleFeatureChange}
              disabled={isReadOnly}
            />
            <span className="checkbox-custom"></span>
            AC
          </label>
        </div>
      </div>
    </div>
  );
}

export default Features;
