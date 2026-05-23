import { Icon } from '@iconify/react';
import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Timeline from '../Timeline';
const timelineData = [
  [
    {
      year: '2019',
      name: 'Started as a small team',
      position: 'Started with 3 passionate photographers',
      type: 'Mobile exelence',
    },
    {
      year: '2021',
      name: 'Expanded our services',
      position: 'Added videography and editing',
      type: 'Desktop exelence',
    },
  ],
  [
    {
      year: '2020',
      name: 'Grew our team',
      position: 'Hired our first full-time editor',
      type: 'Desktop exelence',
    },
    {
      year: '2022',
      name: 'Expanded our reach',
      position: 'Started serving clients across India',
      type: 'Mobile exelence',
    },
  ],
  [
    {
      year: '2023',
      name: 'Launched our website',
      position: 'Showcased our work to the world',
      type: 'Mobile exelence',
    },
    {
      year: '2024',
      name: 'Achieved 100+ happy clients',
      position: 'Trusted by clients across India',
      type: 'Desktop exelence',
    },
  ],
];

export default function TimelineSlider() {
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
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    arrows: false,
    responsive: [
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} className="cs-arrow_style3">
      {timelineData.map((item, index) => (
        <Div key={index}>
          <Timeline columnData={item} />
        </Div>
      ))}
    </Slider>
  );
}
