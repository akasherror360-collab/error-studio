import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Post from '../Post';
import post1 from '../../assets/images/website/Instagram Posters/0-(4).webp';
import post2 from '../../assets/images/website/Instagram Posters/8-(2).webp';

const postData = [
  {
    url: '/blog/wedding-venues-in-and-around-cuddalore',
    src: post1,
    alt: 'Wedding venues around Cuddalore',
    date: '22 Sep 2026',
    title: "Wedding venues in and around Cuddalore: a couple's guide",
  },
  {
    url: '/blog/how-to-prepare-for-your-wedding-shoot',
    src: post2,
    alt: 'Wedding shoot preparation tips',
    date: '22 Sep 2026',
    title: 'How to prepare for your wedding shoot: tips from our team',
  },
];

export default function PostSlider() {
  /** Slider Settings **/
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="cs-gap-24">
      {postData.map((item, index) => (
        <Div key={index}>
          <Post
            url={item.url}
            src={item.src}
            alt={item.alt}
            date={item.date}
            title={item.title}
          />
        </Div>
      ))}
    </Slider>
  );
}
