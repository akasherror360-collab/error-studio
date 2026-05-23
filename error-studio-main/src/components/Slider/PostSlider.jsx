import React from 'react';
import Slider from 'react-slick';
import Div from '../Div';
import Post from '../Post';
import post1 from '../../assets/images/website/Instagram Posters/0-(4).webp';
import post2 from '../../assets/images/website/Instagram Posters/8-(2).webp';
import post3 from '../../assets/images/website/Instagram Posters/11-(4).webp';

const postData = [
  {
    url: '/blog/blog-details',
    src: post1,
    alt: 'Post',
    date: '07 Mar 2022',
    title: 'How to keep fear from ruining your art business with confident',
  },
  {
    url: '/blog/blog-details',
    src: post2,
    alt: 'Post',
    date: '10 Feb 2022',
    title: 'Artistic mind will be great for creation anything',
  },
  {
    url: '/blog/blog-details',
    src: post3,
    alt: 'Post',
    date: '05 Mar 2022',
    title: 'A.I will take over all job for human within next year',
  },
  {
    url: '/blog/blog-details',
    src: post1,
    alt: 'Post',
    date: '07 Mar 2022',
    title: 'How to keep fear from ruining your art business with confident',
  },
  {
    url: '/blog/blog-details',
    src: post2,
    alt: 'Post',
    date: '10 Feb 2022',
    title: 'Artistic mind will be great for creation anything',
  },
  {
    url: '/blog/blog-details',
    src: post3,
    alt: 'Post',
    date: '05 Mar 2022',
    title: 'A.I will take over all job for human within next year',
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
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
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
