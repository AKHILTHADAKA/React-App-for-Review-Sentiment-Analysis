import React from "react";
import "../src/styles/App.css"; // Ensure this path is correct

import reviewsData from "./data/reviewsData.json"; // Import reviews data from JSON file
import ReviewCard from "./components/ReviewCard"; // Import the ReviewCard component

const App = () => {
  return (
    <div className="App">
      <h1 className="heading">Reviews List</h1>
      {reviewsData.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}
    </div>
  );
};

export default App;
