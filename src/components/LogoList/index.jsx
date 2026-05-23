import React from 'react';
import Div from '../Div';
import './logolist.css';
import partner1 from '../../assets/images/partner_1.svg';
import partner2 from '../../assets/images/partner_2.svg';
import partner3 from '../../assets/images/partner_3.svg';
import partner4 from '../../assets/images/partner_4.svg';
import partner5 from '../../assets/images/partner_5.svg';

const partnerLogos = [
  {
    src: partner1,
    alt: 'Partner',
  },
  {
    src: partner2,
    alt: 'Partner',
  },
  {
    src: partner3,
    alt: 'Partner',
  },
  {
    src: partner4,
    alt: 'Partner',
  },
  {
    src: partner5,
    alt: 'Partner',
  },
];

export default function LogoList() {
  return (
    <Div className="cs-partner_logo_wrap">
      {partnerLogos.map((partnerLogo, index) => (
        <div className="cs-partner_logo" key={index}>
          <img src={partnerLogo.src} alt={partnerLogo.alt} />
        </div>
      ))}
    </Div>
  );
}
