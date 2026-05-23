import React from 'react';
import Div from '../Div';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import MenuWidget from '../Widget/MenuWidget';
import Newsletter from '../Widget/Newsletter';
import SocialWidget from '../Widget/SocialWidget';
import TextWidget from '../Widget/TextWidget';
import './footer.css';
import footerLogo from '../../assets/images/error-studio-logo.png';



const serviceMenu = [
  {
    title: 'Wedding Photography',
    href: '/service/wedding-photography',
  },
  {
    title: 'Cinematic Videography',
    href: '/service/videography',
  },
  {
    title: 'Creative Editing',
    href: '/service/video-editing',
  },
  {
    title: 'Brand & Commercial',
    href: '/service/commercial',
  },
];

export default function Footer({ copyrightText, logoSrc, logoAlt, text }) {
  return (
    <footer className="cs-fooer">
      <Div className="cs-fooer_main">
        <Div className="container">
          <Div className="row">
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <TextWidget
                  logoSrc={footerLogo}
                  logoAlt="Error Studio"
                  text="We provide end-to-end visual solutions, from shoot planning and execution to high-quality editing and final delivery."
                />
                <SocialWidget />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <MenuWidget menuItems={serviceMenu} menuHeading="Services" />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
                <ContactInfoWidget title="Contact Us" withIcon />
              </Div>
            </Div>
            <Div className="col-lg-3 col-sm-6">
              <Div className="cs-footer_item">
               <Newsletter
                  title="Reach Us"
               
                />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Div className="container">
        <Div className="cs-bottom_footer">
          <Div className="cs-bottom_footer_left">
            <Div className="cs-copyright">Copyright © 2026 Error Studio.</Div>
          </Div>
          <Div className="cs-bottom_footer_right">
            <a href="https://samhub.in" target="_blank" rel="noopener noreferrer">Designed and developed by Samhub Innovations</a>
          </Div>
        </Div>
      </Div>
    </footer>
  );
}
