import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Hero7 from '../Hero/Hero7';
import slider_5 from '../../assets/images/slider_5.jpeg';
import slider_6 from '../../assets/images/slider_6.jpeg';
import slider_7 from '../../assets/images/slider_7.jpeg';
import slider_8 from '../../assets/images/slider_8.jpeg';
import slider_9 from '../../assets/images/slider_9.jpeg';
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

const showcaseData = [
  {
    title: 'Uber food app <br />case study',
    imgUrl: slider_5,
    href: '/case-study/case-study-details',
  },
  {
    title: 'Uber food app <br />case study',
    imgUrl: slider_6,
    href: '/case-study/case-study-details',
  },
  {
    title: 'Uber food app <br />case study',
    imgUrl: slider_7,
    href: '/case-study/case-study-details',
  },
  {
    title: 'Uber food app <br />case study',
    imgUrl: slider_8,
    href: '/case-study/case-study-details',
  },
  {
    title: 'Uber food app <br />case study',
    imgUrl: slider_9,
    href: '/case-study/case-study-details',
  },
];

export default function CaseStudyShowcaseHome() {
  pageTitle('Case Study Showcase');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero7
        heroSocialLinks={heroSocialLinks}
        socialLinksHeading="Follow Us"
        showcaseData={showcaseData}
      />
    </>
  );
}
