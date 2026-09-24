import React, { useEffect, useRef, useState } from 'react'
import Div from '../Div'
import './funfact.css'

// Counts from 0 up to the final value once the counter scrolls into view, then stops.
function CountUp({ value }) {
  const match = String(value).match(/^(\D*)(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : 0;
  const [shown, setShown] = useState(match ? 0 : value);
  const ref = useRef(null);
  useEffect(() => {
    if (!match) return undefined;
    const el = ref.current;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setShown(target); return undefined; }
    let frame;
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  if (!match) return <span ref={ref}>{value}</span>;
  return <span ref={ref}>{match[1]}{shown}{match[3]}</span>;
}

export default function FunFact({variant, title, subtitle, data}) {
  return (
    <Div className={variant ? `cs-funfact_wrap ${variant}`: 'cs-funfact_wrap'}>
      <Div className="cs-funfact_shape"  style={{backgroundImage: 'url(./images/funfact_shape_bg.svg)'}} />
      <Div className="cs-funfact_left">
        <Div className="cs-funfact_heading">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </Div>
      </Div>
      <Div className="cs-funfact_right">
        <Div className="cs-funfacts">
        {data.map((item, index) => (
          // <article> (not div) so the old saved /admin text patch for the first counter no longer overrides these values
          <article className="cs-funfact cs-style1" key={index}>
            <Div className="cs-funfact_number cs-primary_font cs-semi_bold cs-primary_color"><CountUp value={item.factNumber} /></Div>
            <Div className="cs-funfact_text">
              <p>{item.title}</p>
            </Div>
          </article>
          ))}
        </Div>
      </Div>
    </Div>
  )
}
