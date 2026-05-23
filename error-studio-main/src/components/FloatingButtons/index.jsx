import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './floating.css';

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="cs-floating_btns">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/916384568059"
        className="cs-floating_btn cs-whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <Icon icon="ic:baseline-whatsapp" />
      </a>

      {/* Scroll to Top Button */}
      <button
        className={`cs-floating_btn cs-scroll_top ${showScroll ? 'active' : ''}`}
        onClick={scrollTop}
        aria-label="Scroll to Top"
      >
        <Icon icon="bi:chevron-up" className='p-1'/>
      </button>
    </div>
  );
}
