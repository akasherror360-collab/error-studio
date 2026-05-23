import React from 'react';
import Hero12 from '../Hero/Hero12';
import video_1 from '../../assets/video/video-1.mp4';
import video_2 from '../../assets/video/video-2.mp4';
import video_3 from '../../assets/video/video-3.mp4';
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
    introTitle: 'Video Direction (Jan, 2023)',
    title: 'Nature video short',
    videoUrl: video_3,
    href: '/case-study/case-study-details',
  },
  {
    introTitle: 'Video Direction (Sep, 2023)',
    title: 'TV commercial ad',
    videoUrl: video_1,
    href: '/case-study/case-study-details',
  },
  {
    introTitle: 'Video Direction (Mar, 2023)',
    title: '3D world comes',
    videoUrl: video_2,
    href: '/case-study/case-study-details',
  },
];

export default function VideoShowcaseHome() {
  return (
    <>
      <Hero12
        heroSocialLinks={heroSocialLinks}
        socialLinksHeading="Follow Us"
        showcaseData={showcaseData}
      />
    </>
  );
}
