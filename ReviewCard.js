// src/components/ReviewCard.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faUserPlus,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import Tooltip from "./Tooltip"; // Import the Tooltip component
import "../styles/App.css";

const ReviewCard = ({ review }) => {
  // Number of stars for the rating
  const totalStars = 5;

  // State to manage the current rating
  const [currentRating, setCurrentRating] = useState(review.rating || 0);

  // State to manage tooltip visibility
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  // Handle star click to set rating
  const handleStarClick = (index) => {
    setCurrentRating(index + 1);
  };

  // Generate star elements based on current rating
  const stars = Array.from({ length: totalStars }, (_, index) => {
    const starIcon = index < currentRating ? solidStar : regularStar;
    return (
      <FontAwesomeIcon
        key={index}
        icon={starIcon}
        style={{
          color: "#FFD43B",
          fontSize: "20px",
          marginRight: "4px",
          cursor: "pointer",
        }}
        onClick={() => handleStarClick(index)}
      />
    );
  });

  const handleMouseEnter = (e, sentiment) => {
    setTooltip({
      visible: true,
      text: sentiment === "Positive" ? "Easy to navigate" : "Slow response",
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const getHighlightedText = (text, highlights) => {
    const sortedHighlights = highlights.sort((a, b) => a[0] - b[0]); // Sort by start index
    let lastIndex = 0;
    const segments = [];

    sortedHighlights.forEach(([start, end, sentiment]) => {
      if (start > lastIndex) {
        segments.push(text.substring(lastIndex, start));
      }
      segments.push(
        <span
          key={`${start}-${end}`}
          className={
            sentiment === "Positive"
              ? "highlight-positive"
              : "highlight-negative"
          }
          onMouseEnter={(e) => handleMouseEnter(e, sentiment)}
          onMouseLeave={handleMouseLeave}
        >
          {text.substring(start, end)}
        </span>
      );
      lastIndex = end;
    });

    if (lastIndex < text.length) {
      segments.push(text.substring(lastIndex));
    }

    return segments;
  };

  return (
    <div className="review-card">
      <div className="card-header">
        <img
          src={review.source.icon}
          alt={review.source.name}
          className="logo"
        />
        <div className="review-info">
          <p className="reviewer-name">
            {review.reviewer_name} wrote a review at {review.source.name}
          </p>

          <div className="icons">
            <FontAwesomeIcon icon={faUserPlus} />
            <FontAwesomeIcon icon={faBookmark} />
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="star-rating">
          <div className="rating">{stars}</div>
          <p className="review-date">{review.date}</p>
        </div>
        <p className="review-text">
          {getHighlightedText(
            review.content,
            review.analytics.flatMap((analytic) => analytic.highlight_indices)
          )}
        </p>
        {tooltip.visible && (
          <Tooltip
            text={tooltip.text}
            style={{ top: tooltip.y + 10, left: tooltip.x + 10 }}
          />
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
