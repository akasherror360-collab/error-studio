import React from 'react';
import { useState } from 'react';
import Div from '../Div';
const accordionData = [
  {
    question: 'How far in advance should we book for a wedding?',
    answer:
      'We recommend booking at least 3-6 months in advance for weddings to ensure our team\'s availability, especially during peak seasons like December and May.',
  },
  {
    question: 'Do you provide raw footage?',
    answer:
      'We typically deliver the final polished product as that represents our highest quality standards. However, raw footage can be discussed as an add-on service depending on the package.',
  },
  {
    question: 'What is your turnaround time for albums?',
    answer:
      'For standard events, we deliver digital photos within 2 weeks. Complete wedding albums and cinematic films typically take 4-6 weeks for detailed editing and perfection.',
  },
  {
    question: 'Do you travel for destination shoots?',
    answer:
      'Yes! Error Studio is based in Cuddalore but we are happy to travel across India and abroad to capture your special moments. Travel and accommodation costs are calculated based on location.',
  },
  {
    question: 'Can you customize a package?',
    answer:
      'Absolutely. We understand every event is unique. Contact us with your specific requirements, and we will tailor a package that fits your needs and budget perfectly.',
  },
];

export default function Accordion() {
  const [selected, setSelected] = useState(0);
  const handelToggle = index => {
    if (selected === index) {
      return setSelected(null);
    }
    setSelected(index);
  };

  return (
    <Div className="cs-accordians cs-style1">
      {accordionData.map((item, index) => (
        <Div
          className={`cs-accordian ${selected === index ? 'active' : ''}`}
          key={index}
        >
          <Div
            className="cs-accordian_head"
            onClick={() => handelToggle(index)}
          >
            <h2 className="cs-accordian_title">{item.question}</h2>
            <span className="cs-accordian_toggle cs-accent_color">
              <svg
                width={15}
                height={8}
                viewBox="0 0 15 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0L7.5 7.5L15 0H0Z" fill="currentColor" />
              </svg>
            </span>
          </Div>
          <Div className="cs-accordian_body">
            <Div className="cs-accordian_body_in">{item.answer}</Div>
          </Div>
        </Div>
      ))}
    </Div>
  );
}
