import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Team from '../Team';
import member1 from '../../assets/images/member_1.jpeg';
import member2 from '../../assets/images/member_2.jpeg';
import member3 from '../../assets/images/member_3.jpeg';
import member4 from '../../assets/images/member_4.jpeg';

const teamData = [
  {
    memberImage: member1,
    memberName: 'Ayanash',
    memberDesignation: 'Founder | Photographer & Editor',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member2,
    memberName: 'Jayakumaran',
    memberDesignation: 'Creative Director',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member3,
    memberName: 'Premkumar',
    memberDesignation: 'Senior Photographer',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member4,
    memberName: 'Sagaya Prajin',
    memberDesignation: 'Videographer',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member3,
    memberName: 'Gowtham',
    memberDesignation: 'Videographer & Photographer',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member4,
    memberName: 'Dhas',
    memberDesignation: 'Photographer & Editor',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
  {
    memberImage: member1,
    memberName: 'Akashraj',
    memberDesignation: 'Photographer & Editor',
    memberSocial: { linkedin: '/', twitter: '/', youtube: '/', facebook: '/' },
  },
];

export default function TeamSlider() {
  /** Team Member Data **/

  /** Slider Settings **/
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-prev slick-arrow' + (currentSlide === 0 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
    >
      <Icon icon="bi:arrow-left" />
    </div>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <div
      {...props}
      className={
        'slick-next slick-arrow' +
        (currentSlide === slideCount - 1 ? ' slick-disabled' : '')
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
    >
      <Icon icon="bi:arrow-right" />
    </div>
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="cs-gap-24 cs-arrow_style2">
      {teamData.map((item, index) => (
        <Div key={index}>
          <Team
            memberImage={item.memberImage}
            memberName={item.memberName}
            memberDesignation={item.memberDesignation}
            memberSocial={item.memberSocial}
          />
        </Div>
      ))}
    </Slider>
  );
}
