import React, { useRef, useState } from 'react';
import Div from '../Div';
import './reels.css';

function ReelCard({ id }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      document
        .querySelectorAll('.cs-reel_item video')
        .forEach(other => {
          if (other !== v) other.pause();
        });
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <Div className="cs-reel_item">
      <video
        ref={videoRef}
        src={`/reels/${id}.mp4`}
        poster={`/reels/${id}.webp`}
        playsInline
        preload="none"
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
      {!playing && (
        <button
          className="cs-reel_play"
          onClick={toggle}
          aria-label="Play reel"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="#fff" />
          </svg>
        </button>
      )}
    </Div>
  );
}

export default function Reels({ data }) {
  return (
    <Div className="cs-reels_row">
      {data.map(id => (
        <ReelCard id={id} key={id} />
      ))}
    </Div>
  );
}
