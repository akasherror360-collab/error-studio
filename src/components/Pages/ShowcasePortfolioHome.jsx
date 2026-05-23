import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import 'swiper/css';
import 'swiper/css/pagination';
import Hero6 from '../Hero/Hero6';
import slider_1 from '../../assets/images/slider_1.jpeg';
import slider_2 from '../../assets/images/slider_2.jpeg';
import slider_3 from '../../assets/images/slider_3.jpeg';
import slider_4 from '../../assets/images/slider_4.jpeg';
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
    title: 'Think reality <br/>do positive',
    imgUrl: slider_1,
    href: '/case-study/case-study-details',
  },
  {
    title: 'Think reality <br/>do positive',
    imgUrl: slider_2,
    href: '/case-study/case-study-details',
  },
  {
    title: 'Think reality <br/>do positive',
    imgUrl: slider_3,
    href: '/case-study/case-study-details',
  },
  {
    title: 'Think reality <br/>do positive',
    imgUrl: slider_4,
    href: '/case-study/case-study-details',
  },
];

export default function ShowcasePortfolioHome() {
  pageTitle('Showcase Portfolio');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Hero6
      heroSocialLinks={heroSocialLinks}
      socialLinksHeading="Follow Us"
      showcaseData={showcaseData}
    />
  );
}
