import React, { useState } from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import Testimonial from '../Testimonial';
import Div from '../Div';
import Spacing from '../Spacing';
import testimonial1 from '../../assets/images/website/Instagram Posters/0-(1).webp';
import testimonial2 from '../../assets/images/website/Instagram Posters/14-(8).webp';
import testimonial3 from '../../assets/images/website/Instagram Posters/00-(4).webp';
import testimonial4 from '../../assets/images/website/Instagram Posters/13-(1).webp';
import shape1 from '../../assets/images/shape_1.svg';

const testimonialData = [
  {
    testimonialThumb: testimonial1,
    testimonialText:
      'Error Studio transformed our wedding video into a movie! The editing was surreal and the team was incredibly professional throughout the event.',
    avatarName: 'Anjali & Vikram',
    avatarDesignation: 'Newlyweds',
    ratings: '5',
  },
  {
    testimonialThumb: testimonial2,
    testimonialText:
      'Professional, timely, and incredibly talented crew. They handled our corporate tech summit coverage flawlessly. Highly recommended.',
    avatarName: 'Rajesh Kumar',
    avatarDesignation: 'CEO, TechSolutions',
    ratings: '5',
  },
  {
    testimonialThumb: testimonial3,
    testimonialText:
      'The maternity shoot was magical. They made me feel so comfortable and the photos came out looking like a fairytale.',
    avatarName: 'Priya S.',
    avatarDesignation: 'Happy Client',
    ratings: '4.5',
  },
  {
    testimonialThumb: testimonial4,
    testimonialText:
      'Innovative and reliable. Their product photography significantly boosted our online sales. The attention to detail is unmatched.',
    avatarName: 'Suresh',
    avatarDesignation: 'E-commerce Manager',
    ratings: '4.5',
  },
];

export default function TestimonialSlider() {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

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
  return (
    <>
      <Div className="cs-gradient_bg_1 cs-shape_wrap_3 cs-parallax">
        <Spacing lg="130" md="80" />
        <Div className="cs-shape_3 cs-to_up">
          <img src={shape1} alt="Shape" />
        </Div>
        <Div className="container">
          <Div className="cs-testimonial_slider">
            <Div className="cs-testimonial_slider_left">
              <Slider
                asNavFor={nav1}
                ref={slider2 => setNav2(slider2)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}
                centerMode={true}
                centerPadding="0px"
                arrows={false}
              >
                {testimonialData.map((item, index) => (
                  <Div className="slider-nav_item" key={index}>
                    <Div className="cs-rotate_img">
                      <Div className="cs-rotate_img_in">
                        <img src={item.testimonialThumb} alt="Thumb" />
                      </Div>
                    </Div>
                  </Div>
                ))}
              </Slider>
            </Div>
            <Div className="cs-testimonial_slider_right">
              <Slider
                asNavFor={nav2}
                ref={slider1 => setNav1(slider1)}
                prevArrow={<SlickArrowLeft />}
                nextArrow={<SlickArrowRight />}
                className="cs-arrow_style1"
              >
                {testimonialData.map((item, index) => (
                  <Div key={index}>
                    <Testimonial
                      testimonialText={item.testimonialText}
                      avatarName={item.avatarName}
                      avatarDesignation={item.avatarDesignation}
                      ratings={item.ratings}
                    />
                  </Div>
                ))}
              </Slider>
            </Div>
          </Div>
        </Div>
        <Spacing lg="130" md="80" />
      </Div>
    </>
  );
}
