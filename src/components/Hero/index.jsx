import React from "react";
import parse from "html-react-parser";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./hero.css";
import Button from "../Button";
import Div from "../Div";
import VerticalLinks from "../VerticalLinks";
import carousel1 from "../../assets/images/website/carousel/Banner-02.webp";
import carousel2 from "../../assets/images/website/carousel/Banner.webp";

import carousel4 from "../../assets/images/website/Best Work/Best Album/12x36/54.webp";
import carousel5 from "../../assets/images/website/carousel/01.jpg";
import carousel6 from "../../assets/images/website/carousel/02.jpg";

export default function Hero({
  title,
  subtitle,
  btnText,
  btnLink,
  heroSocialLinks,
}) {
  const images = [carousel2, carousel1, carousel4, carousel5, carousel6];
  console.log("Carousel Images:", images);

  return (
    <Div className="cs-hero cs-style1 cs-bg cs-fixed_bg cs-shape_wrap_1 relative overflow-hidden">
      {/* Swiper Background Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay]}
          speed={1000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="h-full w-full">
              <div
                className="h-full w-full bg-cover bg-center ken-burns"
                style={{ backgroundImage: `url(${img})` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Overlay - requested blur and dark overlay */}
      <div className="absolute inset-0 bg-black/20 z-1 pointer-events-none" />

      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />
      <Div className="cs-shape_1" />

      {/* Content */}
      <Div className="container h-full relative z-10">
        <Div className="cs-hero_text h-full">
          <div className="flex justify-between flex-col h-full">
            <h1 className="cs-hero_title">{parse(title)}</h1>
            <Div className="cs-hero_info">
              <Div>
                <Div className="cs-hero_subtitle">{subtitle}</Div>
              </Div>
              <div className="text-end">
                <Button btnLink={btnLink} btnText={btnText} />
              </div>
            </Div>
          </div>
        </Div>
      </Div>
      <VerticalLinks data={heroSocialLinks} />
      {/* <a href={scrollDownId} className="cs-down_btn">
        .
      </a> */}
    </Div>
  );
}
