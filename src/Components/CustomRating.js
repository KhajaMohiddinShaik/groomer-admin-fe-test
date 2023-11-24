import React from "react";
import "../App.css";

const CustomRating = ({ feed_back, setfeed_back }) => {
  const handleStarClick = (selectedRating) => {
    setfeed_back({ ...feed_back, rating: selectedRating });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= feed_back.rating ? "star selected" : "star"}
            onClick={() => handleStarClick(star)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className="activeStar">{feed_back.rating.toFixed(1)}</div>
    </div>
  );
};

export default CustomRating;
