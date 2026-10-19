import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Post from '../Post';
import post1 from '../../assets/images/website/Instagram Posters/0-(4).webp';
import post3 from '../../assets/images/client-2026-09/ecc79736.webp';
import post4 from '../../assets/images/website/portfolio/8-(5).webp';
import post2 from '../../assets/images/website/Instagram Posters/8-(2).webp';
import post5 from '../../assets/images/website/portfolio/00-(6).webp';

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
  {
    url: '/blog/pre-wedding-shoot-locations-cuddalore',
    src: post3,
    alt: 'Pre-wedding shoot locations around Cuddalore',
    date: '16 Oct 2026',
    title: 'Pre-wedding shoot locations around Cuddalore',
  },
  {
    url: '/blog/candid-vs-traditional-wedding-photography',
    src: post4,
    alt: 'Candid vs traditional wedding photography',
    date: '17 Oct 2026',
    title: 'Candid vs traditional wedding photography',
  },
  {
    url: '/blog/wedding-day-photography-timeline',
    src: post5,
    alt: 'Wedding day photography timeline',
    date: '19 Oct 2026',
    title: 'What a wedding-day photography timeline looks like',
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
