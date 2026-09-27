import React from 'react';

export default function Newsletter({ title }) {
  return (
    <>
      {title && <h2 className="cs-widget_title">{title}</h2>}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.227453399329!2d79.7341211!3d11.7490204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54a3cf0c1e995b%3A0x40fd3cb33843c7f1!2sERROR%20STUDIO!5e0!3m2!1sen!2sus!4v1790536231370!5m2!1sen!2sus"
        width="100%"
        height="220"
        style={{ border: 0, borderRadius: '8px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Error Studio Location"
      />
    </>
  );
}
