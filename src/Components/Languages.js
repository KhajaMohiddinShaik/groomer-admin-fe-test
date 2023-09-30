import "../App.css";

function Languages({ inputs, setInputs, isReadOnly }) {
  // Function to handle language checkbox change
  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    console.log(selectedLanguage);

    // Update the selected language in the inputs state
    // const updatedLanguages = {
    //   ...inputs.languages,
    //   [selectedLanguage]: !inputs.languages[selectedLanguage],
    // };

    // console.log(selectedLanguage, inputs.languages[selectedLanguage]);
    const updatedInput = {
      ...inputs,
      languages: {
        ...inputs.languages,
        [selectedLanguage]: !inputs.languages[selectedLanguage],
      },
    };

    setInputs(updatedInput);
  };

  // Log the selected languages (for debugging)
  // console.log(inputs.languages, "languages");
  return (
    <div
      className="form-group"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <label className="label">Languages:</label>
      <div className="languages-container">
        {/* Checkbox for Telugu */}
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="telugu"
              checked={inputs.languages["telugu"]}
              onChange={handleLanguageChange}
              disabled={isReadOnly}
            />
            <span className="checkbox-custom"></span>
            Telugu
          </label>
        </div>
        {/* Checkbox for Hindi */}
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="hindi"
              checked={inputs.languages["hindi"]}
              onChange={handleLanguageChange}
              disabled={isReadOnly}
            />
            <span className="checkbox-custom"></span>
            Hindi
          </label>
        </div>
        {/* Checkbox for English */}
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              value="english"
              checked={inputs.languages["english"]}
              onChange={handleLanguageChange}
              disabled={isReadOnly}
            />
            <span className="checkbox-custom"></span>
            English
          </label>
        </div>
      </div>
    </div>
  );
}

export default Languages;
