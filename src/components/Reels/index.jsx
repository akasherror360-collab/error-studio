import React from 'react';
import Div from '../Div';
import './reels.css';

// Extracts the shortcode from an Instagram reel URL like
// https://www.instagram.com/reel/ABC123/ or https://www.instagram.com/p/ABC123/
function reelEmbedSrc(url) {
  const m = url.match(/instagram\.com\/(reel|reels|p)\/([A-Za-z0-9_-]+)/);
  return m ? `https://www.instagram.com/${m[1] === 'p' ? 'p' : 'reel'}/${m[2]}/embed` : null;
}

export default function Reels({ data }) {
  return (
    <Div className="cs-reels_row">
      {data.map((url, index) => {
        const src = reelEmbedSrc(url);
        if (!src) return null;
        return (
          <Div className="cs-reel_item" key={index}>
            <iframe
              src={src}
              title={`Instagram reel ${index + 1}`}
              frameBorder="0"
              scrolling="no"
              allowTransparency="true"
              allow="encrypted-media"
              loading="lazy"
            />
          </Div>
        );
      })}
    </Div>
  );
}
