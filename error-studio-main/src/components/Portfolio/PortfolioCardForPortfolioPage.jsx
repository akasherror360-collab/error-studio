import React from "react";
// import { Link } from 'react-router-dom';
import Div from "../Div";
import "./portfolio.css";

export default function PortfolioCardForPortfolioPage({
  src,
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
        <Div
          className="cs-portfolio_bg cs-bg"
          style={{ backgroundImage: `url("${src}")` }}
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
