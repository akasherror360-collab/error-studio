import React from "react";
// import { Link } from 'react-router-dom';
import Div from "../Div";
import "./portfolio.css";

export default function PortfolioCardForPortfolioPage({
  src,
  alt,
  variant,
  onClick,
}) {
  return (
    <div
      className={`cs-portfolio cs-bg ${variant ? variant : "cs-style1"} cursor-pointer`}
      onClick={onClick}
    >
      <>
        <Div className="cs-portfolio_hover" />
        <img
          src={src}
          alt={alt || "Error Studio portfolio photograph"}
          className="cs-portfolio_bg cs-portfolio_img"
          loading="lazy"
          decoding="async"
        />
        <Div className="cs-portfolio_info">
          {/* <Div className="cs-portfolio_info_bg bg-[#F9A30A]" />
          <h2 className="cs-portfolio_title text-dark">{title}</h2>
          <Div className="cs-portfolio_subtitle text-gray-300" >{subtitle}</Div> */}
        </Div>
      </>
    </div>
  );
}
