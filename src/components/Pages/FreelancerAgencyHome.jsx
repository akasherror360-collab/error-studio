import React, { useEffect, useState } from 'react';
import Hero8 from '../Hero/Hero8';
import ServiceListStyle2 from '../ServiceList/ServiceListStyle2';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import Portfolio from '../Portfolio';
import Div from '../Div';
import { pageTitle } from '../../helper';
import { Icon } from '@iconify/react';
import TestimonialSlider from '../Slider/TestimonialSlider';
import VideoModal from '../VideoModal';
import Cta from '../Cta';
import LogoList from '../LogoList';
import MovingText from '../MovingText';
import hero_bg_5 from '../../assets/images/hero_bg_5.jpeg';
import hero_img from '../../assets/images/hero_img.svg';
import portfolio_39 from '../../assets/images/portfolio_39.jpeg';
import portfolio_40 from '../../assets/images/portfolio_40.jpeg';
import portfolio_41 from '../../assets/images/portfolio_41.jpeg';
import portfolio_42 from '../../assets/images/portfolio_42.jpeg';
import portfolio_43 from '../../assets/images/portfolio_43.jpeg';
import portfolio_44 from '../../assets/images/portfolio_44.jpeg';
import portfolio_10 from '../../assets/images/portfolio_10.jpeg';
import portfolio_4 from '../../assets/images/portfolio_4.jpeg';
import portfolio_5 from '../../assets/images/portfolio_5.jpeg';
import portfolio_6 from '../../assets/images/portfolio_6.jpeg';
import video_bg_2 from '../../assets/images/video_bg_2.jpeg';
import cta_bg from '../../assets/images/cta_bg.jpeg';
const heroSocialLinks = [
  {
    name: 'Behance',
    links: '/',
  },
  {
    name: 'Twitter',
    links: '/',
  },
];
const portfolioData = [
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_39,
    category: 'ui_ux_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_40,
    category: 'logo_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_41,
    category: 'web_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_42,
    category: 'mobile_apps',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_43,
    category: 'ui_ux_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_44,
    category: 'web_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_10,
    category: 'logo_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_4,
    category: 'ui_ux_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_5,
    category: 'logo_design',
  },
  {
    title: 'Colorful Art Work',
    subtitle: 'See Details',
    href: '/portfolio/portfolio-details',
    src: portfolio_6,
    category: 'web_design',
  },
];
const categoryMenu = [
  {
    title: 'Web Design',
    category: 'web_design',
  },
  {
    title: 'UI/UX Design',
    category: 'ui_ux_design',
  },
  {
    title: 'Mobile Apps',
    category: 'mobile_apps',
  },
  {
    title: 'Logo Design',
    category: 'logo_design',
  },
];

export default function FreelancerAgencyHome() {
  pageTitle('Portfolio');
  const [active, setActive] = useState('all');
  const [itemShow, setItemShow] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero8
        title="We Are Award’s Wining Freelancing Agency"
        subtitle="We deliver best problem solving solution for our client and provide
        finest finishing product in present and upcoming future."
        btnLink="/contact"
        btnText="Let’s talk"
        socialLinksHeading="Follow Us"
        heroSocialLinks={heroSocialLinks}
        bgImageUrl={hero_bg_5}
        bannerHighlightText="A"
        spiningCircleUrl={hero_img}
      />
      <section className="cs-shape_wrap_4 cs-parallax">
        <div className="cs-shape_4 cs-to_up" />
        <div className="cs-shape_4 cs-to_right" />
        <Spacing lg="145" md="80" />
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-4">
              <SectionHeading
                title="We provide best value offer"
                subtitle="Services"
                btnLink="/service"
                btnText="See All Services"
              />
              <Spacing lg="45" md="45" />
            </div>
            <div className="col-lg-7 offset-xl-1">
              <ServiceListStyle2 />
            </div>
          </div>
        </div>
      </section>
      <Spacing lg="115" md="55" />
      <Div className="container">
        <Div className="cs-portfolio_1_heading">
          <SectionHeading title="Some recent work" subtitle="Our Portfolio" />
          <Div className="cs-filter_menu cs-style1">
            <ul className="cs-mp0 cs-center">
              <li className={active === 'all' ? 'active' : ''}>
                <span onClick={() => setActive('all')}>All</span>
              </li>
              {categoryMenu.map((item, index) => (
                <li
                  className={active === item.category ? 'active' : ''}
                  key={index}
                >
                  <span onClick={() => setActive(item.category)}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </Div>
        </Div>
        <Spacing lg="90" md="45" />
        <Div className="cs_portfolio_grid_2">
          {portfolioData.slice(0, itemShow).map((item, index) => (
            <Div
              className={`${
                active === 'all'
                  ? ''
                  : !(active === item.category)
                  ? 'd-none'
                  : ''
              }`}
              key={index}
            >
              <Portfolio
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
                src={item.src}
                variant="cs-style1 cs-type1"
              />
            </Div>
          ))}
        </Div>

        <Div className="text-center">
          {portfolioData.length <= itemShow ? (
            ''
          ) : (
            <>
              <Spacing lg="65" md="40" />
              <span
                className="cs-text_btn"
                onClick={() => setItemShow(itemShow + 4)}
              >
                <span>Load More</span>
                <Icon icon="bi:arrow-right" />
              </span>
            </>
          )}
        </Div>
      </Div>
      <Spacing lg="145" md="80" />
      {/* Start Testimonial Section */}
      <TestimonialSlider />
      {/* End Testimonial Section */}

      {/* Start Video Block Section */}
      <Spacing lg="140" md="70" />
      <Div className="container">
        <h2 className="cs-font_50 cs-m0 text-center cs-line_height_4">
          Our agile process is ability to adapt and respond to change. Agile
          organizations view change as an opportunity, not a threat.
        </h2>
        <Spacing lg="70" md="70" />
        <VideoModal
          videoSrc="https://www.youtube.com/watch?v=VcaAVWtP48A"
          bgUrl={video_bg_2}
        />
      </Div>
      {/* End Video Block Section */}

      {/* Start MovingText Section */}
      <Spacing lg="125" md="70" />
      <MovingText text="Our reputed world wide partners" />
      <Spacing lg="105" md="70" />
      {/* End MovingText Section */}

      {/* Start LogoList Section */}
      <Div className="container">
        <LogoList />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End LogoList Section */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Let’s disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={cta_bg}
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
