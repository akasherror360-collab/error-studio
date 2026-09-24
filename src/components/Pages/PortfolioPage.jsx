import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { pageTitle } from "../../helper";
import PageHeading from "../PageHeading";
import Div from "../Div";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import ImagePopup from "../ImagePopup/ImagePopup";
import portfolio_hero_bg from "../../assets/images/portfolio_hero_bg.jpeg";
import client_0200bd0e from "../../assets/images/client-2026-09/0200bd0e.webp";
import client_02a83c7d from "../../assets/images/client-2026-09/02a83c7d.webp";
import client_11c32d9e from "../../assets/images/client-2026-09/11c32d9e.webp";
import client_412bbcee from "../../assets/images/client-2026-09/412bbcee.webp";
import client_68828210 from "../../assets/images/client-2026-09/68828210.webp";
import client_6d1e3054 from "../../assets/images/client-2026-09/6d1e3054.webp";
import client_7196946d from "../../assets/images/client-2026-09/7196946d.webp";
import client_83b84cb3 from "../../assets/images/client-2026-09/83b84cb3.webp";
import client_992275cb from "../../assets/images/client-2026-09/992275cb.webp";
import client_b3175fbd from "../../assets/images/client-2026-09/b3175fbd.webp";
import client_ca15442e from "../../assets/images/client-2026-09/ca15442e.webp";
import client_ecc79736 from "../../assets/images/client-2026-09/ecc79736.webp";
import client_f029984b from "../../assets/images/client-2026-09/f029984b.webp";
import portfolio_0_2 from "../../assets/images/website/portfolio/0-(2).webp";
import portfolio_00_2 from "../../assets/images/website/portfolio/00-(2).webp";
import portfolio_00_6 from "../../assets/images/website/portfolio/00-(6).webp";
import portfolio_1_1 from "../../assets/images/website/portfolio/1-(1).webp";
import portfolio_1_2 from "../../assets/images/website/portfolio/1-(2).webp";
import portfolio_1_3 from "../../assets/images/website/portfolio/1-(3).webp";
import portfolio_1_4 from "../../assets/images/website/portfolio/1-(4).webp";
import portfolio_1_6 from "../../assets/images/website/portfolio/1-(6).webp";
import portfolio_10_5 from "../../assets/images/website/portfolio/10-(5).webp";
import portfolio_12_1 from "../../assets/images/website/portfolio/12-(1).webp";
import portfolio_12_3 from "../../assets/images/website/portfolio/12-(3).webp";
import portfolio_13_1 from "../../assets/images/website/portfolio/13-(1).webp";
import portfolio_13_2 from "../../assets/images/website/portfolio/13-(2).webp";
import portfolio_13_7 from "../../assets/images/website/portfolio/13-(7).webp";
import portfolio_14_1 from "../../assets/images/website/portfolio/14-(1).webp";
import portfolio_14_10 from "../../assets/images/website/portfolio/14-(10).webp";
import portfolio_15_6 from "../../assets/images/website/portfolio/15-(6).webp";
import portfolio_15_8 from "../../assets/images/website/portfolio/15-(8).webp";
import portfolio_18_10 from "../../assets/images/website/portfolio/18-(10).webp";
import portfolio_18_2 from "../../assets/images/website/portfolio/18-(2).webp";
import portfolio_2_1 from "../../assets/images/website/portfolio/2-(1).webp";
import portfolio_2_2 from "../../assets/images/website/portfolio/2-(2).webp";
import portfolio_3_1 from "../../assets/images/website/portfolio/3-(1).webp";
import portfolio_6_2 from "../../assets/images/website/portfolio/6-(2).webp";
import portfolio_8_1 from "../../assets/images/website/portfolio/8-(1).webp";
import portfolio_8_5 from "../../assets/images/website/portfolio/8-(5).webp";
import portfolio_9_5 from "../../assets/images/website/portfolio/9-(5).webp";
import PortfolioCardForPortfolioPage from "../Portfolio/PortfolioCardForPortfolioPage";
import Reels from "../Reels";
import reelIds from "../Reels/reelsData";
import "./portfolio-categories.css";

// Each photo belongs to one category (album spreads removed from the portfolio). Engagement and Reception have no photos yet,
// so they stay hidden until photos are added.
const portfolioData = [
  { src: portfolio_15_8, category: "portraits" },
  { src: client_0200bd0e, category: "portraits" },
  { src: client_412bbcee, category: "portraits" },
  { src: client_6d1e3054, category: "portraits" },
  { src: client_7196946d, category: "portraits" },
  { src: client_83b84cb3, category: "portraits" },
  { src: client_992275cb, category: "portraits" },
  { src: portfolio_12_1, category: "portraits" },
  { src: portfolio_12_3, category: "portraits" },
  { src: portfolio_15_6, category: "portraits" },
  { src: portfolio_2_1, category: "portraits" },
  { src: portfolio_2_2, category: "portraits" },
  { src: portfolio_3_1, category: "portraits" },
  { src: client_ca15442e, category: "couples" },
  { src: client_11c32d9e, category: "couples" },
  { src: portfolio_1_4, category: "couples" },
  { src: portfolio_14_1, category: "couples" },
  { src: portfolio_14_10, category: "couples" },
  { src: portfolio_18_10, category: "couples" },
  { src: portfolio_18_2, category: "couples" },
  { src: client_ecc79736, category: "pre-wedding" },
  { src: client_68828210, category: "pre-wedding" },
  { src: client_b3175fbd, category: "pre-wedding" },
  { src: portfolio_0_2, category: "pre-wedding" },
  { src: portfolio_1_1, category: "pre-wedding" },
  { src: portfolio_1_2, category: "pre-wedding" },
  { src: portfolio_1_3, category: "pre-wedding" },
  { src: portfolio_1_6, category: "pre-wedding" },
  { src: portfolio_10_5, category: "pre-wedding" },
  { src: portfolio_13_1, category: "pre-wedding" },
  { src: portfolio_13_2, category: "pre-wedding" },
  { src: portfolio_13_7, category: "pre-wedding" },
  { src: portfolio_8_1, category: "pre-wedding" },
  { src: portfolio_8_5, category: "pre-wedding" },
  { src: portfolio_9_5, category: "pre-wedding" },
  { src: portfolio_00_6, category: "tamil-weddings" },
  { src: client_02a83c7d, category: "tamil-weddings" },
  { src: client_f029984b, category: "tamil-weddings" },
  { src: portfolio_00_2, category: "tamil-weddings" },
  { src: portfolio_6_2, category: "tamil-weddings" }
];

// Category order as set by the owner.
const categoryMenu = [
  { title: "All Photographs", category: "all-photos", thumb: portfolio_10_5 },
  { title: "Portraits", category: "portraits", thumb: portfolio_15_8 },
  { title: "Couples", category: "couples", thumb: client_ca15442e },
  { title: "Pre-Wedding", category: "pre-wedding", thumb: client_ecc79736 },
  { title: "Tamil Weddings", category: "tamil-weddings", thumb: portfolio_00_6 },
  { title: "Engagement", category: "engagement" },
  { title: "Reception", category: "reception" },
  { title: "Reels", category: "reels", thumb: portfolio_1_6 }
];

const countFor = (category) =>
  category === "reels" ? reelIds.length : category === "all-photos" ? portfolioData.length : portfolioData.filter((p) => p.category === category).length;
const visibleCategories = categoryMenu.filter((c) => countFor(c.category) > 0);

export default function PortfolioPage() {
  pageTitle("Portfolio");
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category");
  const active = visibleCategories.some((item) => item.category === requestedCategory)
    ? requestedCategory
    : "all";
  const filterRef = useRef(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const scrollToFilter = (smooth) => {
    if (!filterRef.current) return;
    const top = filterRef.current.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  };
  const setActive = (category) => {
    setSearchParams(category === "all" ? {} : { category }, { replace: false });
    setSelectedImageIndex(null);
    setTimeout(() => scrollToFilter(true), 30);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (requestedCategory || searchParams.get("view") === "all") setTimeout(() => scrollToFilter(false), 60);
    // Run once on page load so deep links land on the right section.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const photos = active === "all" || active === "reels" ? [] : active === "all-photos" ? portfolioData : portfolioData.filter((p) => p.category === active);
  const popupImages = photos.map((item, index) => ({ image: item.src, imgTitle: `Portfolio Image ${index + 1}` }));
  const activeTitle = (visibleCategories.find((c) => c.category === active) || {}).title;

  return (
    <>
      <PageHeading title="Portfolio" bgSrc={portfolio_hero_bg} pageLinkText="Portfolio" />
      <Spacing lg="145" md="80" />
      <Div className="container">
        <div className="cs-portfolio_1_heading" id="all" ref={filterRef}>
          <SectionHeading title={active === "all" ? "Choose a category" : activeTitle} subtitle="Our Portfolio" />
          <Div className="cs-filter_menu cs-style1">
            <ul className="cs-mp0 cs-center">
              <li className={active === "all" ? "active" : ""}>
                <span onClick={() => setActive("all")}>All</span>
              </li>
              {visibleCategories.map((item) => (
                <li className={active === item.category ? "active" : ""} key={item.category}>
                  <span onClick={() => setActive(item.category)}>{item.title}</span>
                </li>
              ))}
            </ul>
          </Div>
        </div>
        <Spacing lg="70" md="40" />

        {active === "all" && (
          <div className="es-cat_grid">
            {visibleCategories.map((item) => (
              <button type="button" className="es-cat_card" key={item.category} onClick={() => setActive(item.category)}>
                <img src={item.thumb} alt={item.title} loading="lazy" />
                <span className="es-cat_name">{item.title}</span>
                <span className="es-cat_count">{countFor(item.category)} {item.category === "reels" ? "reels" : "photos"}</span>
              </button>
            ))}
          </div>
        )}

        {active === "reels" && <Reels data={reelIds} />}

        {photos.length > 0 && (
          <Div className="row">
            {photos.map((item, index) => (
              <div className="col-lg-4 col-sm-6" key={`${active}-${index}`}>
                <PortfolioCardForPortfolioPage src={item.src} variant="cs-style1 cs-type1" onClick={() => setSelectedImageIndex(index)} />
                <Spacing lg="25" md="25" />
              </div>
            ))}
          </Div>
        )}

        {active !== "all" && (
          <Div className="text-center">
            <Spacing lg="40" md="30" />
            <span className="cs-text_btn border px-3 py-2" onClick={() => setActive("all")}>
              <span>All categories</span>
            </span>
          </Div>
        )}
      </Div>
      <Spacing lg="145" md="80" />

      <ImagePopup
        images={popupImages}
        selectedIndex={selectedImageIndex}
        onClose={() => setSelectedImageIndex(null)}
        onNext={() => setSelectedImageIndex((prev) => (prev + 1) % photos.length)}
        onPrev={() => setSelectedImageIndex((prev) => (prev - 1 + photos.length) % photos.length)}
      />
    </>
  );
}
