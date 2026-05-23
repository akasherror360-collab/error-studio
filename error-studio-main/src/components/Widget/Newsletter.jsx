import React from 'react';

export default function Newsletter({ title }) {
  return (
    <>
      {title && <h2 className="cs-widget_title">{title}</h2>}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.226435949011!2d79.73232414837688!3d11.749092154690135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54a3002a5f01b5%3A0x6a60aa14581eae8b!2sGopal%20Nagar!5e0!3m2!1sen!2sin!4v1775674860654!5m2!1sen!2sin"
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
