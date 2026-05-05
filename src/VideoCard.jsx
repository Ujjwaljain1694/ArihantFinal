import React, { useState } from "react";
import "./VideoCard.css";

function VideoCard() {
  const [play, setPlay] = useState(false);

  return (
    <div className="video-card-container">
      
      {!play ? (
        <div className="thumbnail" onClick={() => setPlay(true)}>
          
          <img
            src="https://img.youtube.com/vi/67CeWgOOIPU/maxresdefault.jpg"
            alt="video thumbnail"
          />

          <div className="play-btn">
            <div className="triangle"></div>
          </div>

        </div>
      ) : (
        <iframe
          className="video-element"
          src="https://www.youtube.com/embed/67CeWgOOIPU?autoplay=1"
          title="YouTube video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      )}

    </div>
  );
}

export default VideoCard;
