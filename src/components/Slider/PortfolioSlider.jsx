import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Portfolio from "../Portfolio";
import Div from "../Div";
import "swiper/css";
import "swiper/css/pagination";

export default function PortfolioSlider({ data }) {
  const [swiper, setSwiper] = useState(null);

  const handleSlideClick = (index) => {
    if (swiper) {
      swiper.slideToLoop(index);
    }
  };

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      speed={500}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    
      breakpoints={{
        768: {
          slidesPerView: 3,
        },
      }}
      onSwiper={setSwiper}
      className="cs-slider cs-style3"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <Div
              className={isActive ? "slick-center" : ""}
              onClick={() => handleSlideClick(index)}
            >
              <Portfolio
                title={item.title}
                subtitle={item.subtitle}
                href={item.href}
                src={item.src}
              />
            </Div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
