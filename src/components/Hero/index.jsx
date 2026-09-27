import React from "react";
import parse from "html-react-parser";
import "./hero.css";
import Button from "../Button";
import Div from "../Div";
import VerticalLinks from "../VerticalLinks";
import carousel5 from "../../assets/images/website/carousel/01.jpg";

export default function Hero({
  title,
  subtitle,
  btnText,
  btnLink,
  heroSocialLinks,
}) {
  return (
    <Div className="cs-hero cs-style1 cs-bg cs-fixed_bg cs-shape_wrap_1 relative overflow-hidden">
      <div className="cs-hero_still" style={{ backgroundImage: `url(${carousel5})` }} aria-hidden="true" />

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
