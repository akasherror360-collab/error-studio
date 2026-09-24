import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SocialWidget from '../Widget/SocialWidget';
import './header.css';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import Div from '../Div';
import DropDown from './DropDown';
import logo from '../../assets/images/error-studio-logo.png';
import footerLogo from '../../assets/images/error-studio-logo.png';

const serviceLinks = [
  { to: 'service/wedding-photography', label: 'Wedding Photography' },
  { to: 'service/videography', label: 'Cinematic Videography' },
  { to: 'service/video-editing', label: 'Creative Editing' },
  { to: 'service/commercial', label: 'Brand & Commercial' },
  { to: 'service/album-design', label: 'Album Design' },
  { to: 'service/event-coverage', label: 'Event Coverage' },
  { to: 'service/cinematic-teasers', label: 'Cinematic Teasers' },
];

const portfolioLinks = [
  { to: '/portfolio?category=wedding', label: 'Weddings' },
  { to: '/portfolio?category=event', label: 'Events' },
  { to: '/portfolio?category=commercial', label: 'Commercial' },
  { to: '/portfolio?category=creative', label: 'Creative Edits' },
  { to: '/portfolio?category=reels', label: 'Reels' },
];

export default function Header({ variant }) {
  const [isSticky, setIsSticky] = useState(false);
  const [sideHeaderToggle, setSideHeaderToggle] = useState(false);
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    });
  }, []);

  const closeMobile = () => setMobileToggle(false);

  return (
    <>
      <header
        className={`cs-site_header cs-style1 text-uppercase ${variant ? variant : ''
          } cs-sticky_header ${isSticky ? 'cs-sticky_header_active' : ''}`}
      >
        <Div className="cs-main_header">
          <Div className="container">
            <Div className="cs-main_header_in">
              {/* Left menu (desktop) */}
              <Div className="cs-nav cs-primary_font cs-medium cs-nav_desktop cs-nav_left">
                <ul className="cs-nav_list">
                  <li>
                    <NavLink to="/" onClick={closeMobile}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="about" onClick={closeMobile}>
                      About
                    </NavLink>
                  </li>
                  <li className="menu-item-has-children">
                    <NavLink to="portfolio" onClick={closeMobile}>
                      Portfolio
                    </NavLink>
                    <DropDown>
                      <ul>
                        {portfolioLinks.map((item) => (
                          <li key={item.to}>
                            <Link to={item.to} onClick={closeMobile}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </DropDown>
                  </li>
                </ul>
              </Div>

              {/* Centered logo */}
              <Div className="cs-main_header_left cs-header_logo_center">
                <Link className="cs-site_branding" to="/">
                  <img src={logo} alt="Error Studio" width={100} height={100} style={{ borderRadius: "100%", height: "100px" }} />
                </Link>
              </Div>

              {/* Right menu (desktop) + tools */}
              <Div className="cs-main_header_right">
                <Div className="cs-nav cs-primary_font cs-medium cs-nav_desktop cs-nav_right">
                  <ul className="cs-nav_list">
                    <li className="menu-item-has-children">
                      <NavLink to="service" onClick={closeMobile}>
                        Services
                      </NavLink>
                      <DropDown>
                        <ul>
                          {serviceLinks.map((item) => (
                            <li key={item.to}>
                              <Link to={item.to} onClick={closeMobile}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </DropDown>
                    </li>
                    <li>
                      <NavLink to="blog" onClick={closeMobile}>
                        Blogs
                      </NavLink>
                    </li>
                    <li>
                      <Link to="/contact" onClick={closeMobile}>
                        Contact
                      </Link>
                    </li>
                  </ul>
                </Div>
                <Div className="cs-toolbox">
                  <span
                    className="cs-icon_btn"
                    onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                  >
                    <span className="cs-icon_btn_in">
                      <span />
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                </Div>
                <span
                  className={
                    mobileToggle
                      ? 'cs-munu_toggle cs-toggle_active'
                      : 'cs-munu_toggle'
                  }
                  onClick={() => setMobileToggle(!mobileToggle)}
                >
                  <span></span>
                </span>
              </Div>

              {/* Mobile menu (all items) */}
              <Div className="cs-nav cs-primary_font cs-medium cs-nav_mobile">
                <ul
                  className="cs-nav_list"
                  style={{ display: `${mobileToggle ? 'block' : 'none'}` }}
                >
                  <li>
                    <NavLink to="/" onClick={closeMobile}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="about" onClick={closeMobile}>
                      About
                    </NavLink>
                  </li>
                  <li className="menu-item-has-children">
                    <NavLink to="service" onClick={closeMobile}>
                      Services
                    </NavLink>
                    <DropDown>
                      <ul>
                        {serviceLinks.map((item) => (
                          <li key={item.to}>
                            <Link to={item.to} onClick={closeMobile}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </DropDown>
                  </li>
                  <li className="menu-item-has-children">
                    <NavLink to="portfolio" onClick={closeMobile}>
                      Portfolio
                    </NavLink>
                    <DropDown>
                      <ul>
                        {portfolioLinks.map((item) => (
                          <li key={item.to}>
                            <Link to={item.to} onClick={closeMobile}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </DropDown>
                  </li>
                  <li>
                    <NavLink to="blog" onClick={closeMobile}>
                      Blogs
                    </NavLink>
                  </li>
                  <li>
                    <Link to="/contact" onClick={closeMobile}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </Div>
            </Div>
          </Div>
        </Div>
      </header>

      <Div
        className={
          sideHeaderToggle ? 'cs-side_header active' : 'cs-side_header'
        }
      >
        <button
          className="cs-close"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div
          className="cs-side_header_overlay"
          onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
        />
        <Div className="cs-side_header_in">
          <Div className="cs-side_header_shape" />
          <Link className="cs-site_branding" to="/">
            <img src={footerLogo} alt="Error Studio" />
          </Link>
          <Div className="cs-side_header_box">
            <h2 className="cs-side_header_heading">
              Do you have a project in your <br /> mind? Keep connect us.
            </h2>
          </Div>
          <Div className="cs-side_header_box">
            <ContactInfoWidget title="Contact Us" withIcon />
          </Div>
          <Div className="cs-side_header_box">
            <SocialWidget />
          </Div>
        </Div>
      </Div>
    </>
  );
}
