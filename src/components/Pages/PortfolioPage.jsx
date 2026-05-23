import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { pageTitle } from "../../helper";
// import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import SectionHeading from "../SectionHeading";
import Spacing from "../Spacing";
import ImagePopup from "../ImagePopup/ImagePopup";
import portfolio_hero_bg from "../../assets/images/portfolio_hero_bg.jpeg";

// Portfolio images from assets/images/website/portfolio
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
import portfolio_4_2 from "../../assets/images/website/portfolio/4-(2).webp";
import portfolio_6_2 from "../../assets/images/website/portfolio/6-(2).webp";
import portfolio_8_1 from "../../assets/images/website/portfolio/8-(1).webp";
import portfolio_8_5 from "../../assets/images/website/portfolio/8-(5).webp";
import portfolio_9_5 from "../../assets/images/website/portfolio/9-(5).webp";

// Portfolio images from assets/images/website/portfolio/12X36
import portfolio_12x36_01 from "../../assets/images/website/portfolio/12X36/01.webp";
import portfolio_12x36_02 from "../../assets/images/website/portfolio/12X36/02.webp";
import portfolio_12x36_03 from "../../assets/images/website/portfolio/12X36/03.webp";
import portfolio_12x36_15 from "../../assets/images/website/portfolio/12X36/15.webp";
import portfolio_12x36_16 from "../../assets/images/website/portfolio/12X36/16.webp";
import portfolio_12x36_17 from "../../assets/images/website/portfolio/12X36/17.webp";
import portfolio_12x36_18 from "../../assets/images/website/portfolio/12X36/18.webp";
import portfolio_12x36_19 from "../../assets/images/website/portfolio/12X36/19.webp";
import portfolio_12x36_20 from "../../assets/images/website/portfolio/12X36/20.webp";
import portfolio_12x36_21 from "../../assets/images/website/portfolio/12X36/21.webp";
import portfolio_12x36_22 from "../../assets/images/website/portfolio/12X36/22.webp";
import portfolio_12x36_35 from "../../assets/images/website/portfolio/12X36/35.webp";
import portfolio_12x36_44 from "../../assets/images/website/portfolio/12X36/44.webp";
import portfolio_12x36_52 from "../../assets/images/website/portfolio/12X36/52.webp";
import portfolio_12x36_53 from "../../assets/images/website/portfolio/12X36/53.webp";
import PortfolioCardForPortfolioPage from "../Portfolio/PortfolioCardForPortfolioPage";
import {
  ChevronsDownIcon,
  ChevronsUpIcon,
} from "lucide-react";

// Portfolio data organized following the pattern:
// Row 1: 3 images from portfolio folder
// Rows 2-4: alternating 1 portfolio + 1 12X36
// Repeat pattern
const portfolioData = [
  // Row 1: 3 images from portfolio folder
  { src: portfolio_0_2, category: "wedding" },
  { src: portfolio_00_2, category: "event" },
  { src: portfolio_00_6, category: "commercial" },

  // Row 2: 1 portfolio + 1 12X36

  { src: portfolio_12x36_01, category: "creative" },
  { src: portfolio_1_1, category: "wedding" },

  // Row 3: 1 portfolio + 1 12X36
  { src: portfolio_1_2, category: "event" },
  { src: portfolio_12x36_02, category: "commercial" },

  // Row 4: 1 portfolio + 1 12X36
  { src: portfolio_1_3, category: "wedding" },
  { src: portfolio_12x36_03, category: "creative" },

  // Row 5: 3 images from portfolio folder
  { src: portfolio_1_4, category: "event" },
  { src: portfolio_1_6, category: "commercial" },
  { src: portfolio_10_5, category: "wedding" },

  // Row 6: 1 portfolio + 1 12X36
  { src: portfolio_12_1, category: "creative" },
  { src: portfolio_12x36_15, category: "event" },

  // Row 7: 1 portfolio + 1 12X36
  { src: portfolio_12_3, category: "commercial" },
  { src: portfolio_12x36_16, category: "wedding" },

  // Row 8: 1 portfolio + 1 12X36
  { src: portfolio_13_1, category: "creative" },
  { src: portfolio_12x36_17, category: "event" },

  // Row 9: 3 images from portfolio folder
  { src: portfolio_13_2, category: "commercial" },
  { src: portfolio_13_7, category: "wedding" },
  { src: portfolio_14_1, category: "creative" },

  // Row 10: 1 portfolio + 1 12X36
  { src: portfolio_14_10, category: "event" },
  { src: portfolio_12x36_18, category: "commercial" },

  // Row 11: 1 portfolio + 1 12X36
  { src: portfolio_15_6, category: "wedding" },
  { src: portfolio_12x36_19, category: "creative" },

  // Row 12: 1 portfolio + 1 12X36
  { src: portfolio_15_8, category: "event" },
  { src: portfolio_12x36_20, category: "commercial" },

  // Row 13: 3 images from portfolio folder
  { src: portfolio_18_10, category: "wedding" },
  { src: portfolio_18_2, category: "creative" },
  { src: portfolio_2_1, category: "event" },

  // Row 14: 1 portfolio + 1 12X36
  { src: portfolio_2_2, category: "commercial" },
  { src: portfolio_12x36_21, category: "wedding" },

  // Row 15: 1 portfolio + 1 12X36
  { src: portfolio_3_1, category: "creative" },
  { src: portfolio_12x36_22, category: "event" },

  // Row 16: 1 portfolio + 1 12X36
  { src: portfolio_4_2, category: "commercial" },
  { src: portfolio_12x36_35, category: "wedding" },

  // Row 17: 3 images from portfolio folder
  { src: portfolio_6_2, category: "creative" },
  { src: portfolio_8_1, category: "event" },
  { src: portfolio_8_5, category: "commercial" },

  // Row 18: 1 portfolio + 1 12X36
  { src: portfolio_9_5, category: "wedding" },
  { src: portfolio_12x36_44, category: "creative" },

  // Row 19: 1 portfolio + 1 12X36 (using remaining images)
  // { src: portfolio_4, category: "event" },
  { src: portfolio_12x36_52, category: "commercial" },

  // Row 20: 1 portfolio + 1 12X36
  // { src: portfolio_5, category: "wedding" },
  { src: portfolio_12x36_53, category: "creative" },

  // Row 21: 3 images from portfolio folder
  // { src: portfolio_6, category: "event" },
  // { src: portfolio_7, category: "commercial" },
  // { src: portfolio_8, category: "wedding" },

  // Row 22: 2 images
  // { src: portfolio_9, category: "creative" },
  // { src: portfolio_10, category: "event" },

  // Continue pattern with remaining slots (rows 23-32)
  // Repeating some images to fill 32 rows
  { src: portfolio_0_2, category: "commercial" },
  { src: portfolio_00_2, category: "wedding" },

  { src: portfolio_00_6, category: "creative" },
  { src: portfolio_1_1, category: "event" },
  { src: portfolio_1_2, category: "commercial" },

  { src: portfolio_1_3, category: "wedding" },
  { src: portfolio_1_4, category: "creative" },

  { src: portfolio_1_6, category: "event" },
  { src: portfolio_10_5, category: "commercial" },

  { src: portfolio_12_1, category: "wedding" },
  { src: portfolio_12_3, category: "creative" },
  { src: portfolio_13_1, category: "event" },

  { src: portfolio_13_2, category: "commercial" },
  { src: portfolio_13_7, category: "wedding" },

  { src: portfolio_14_1, category: "creative" },
  { src: portfolio_14_10, category: "event" },
];

const categoryMenu = [
  {
    title: "Weddings",
    category: "wedding",
  },
  {
    title: "Events",
    category: "event",
  },
  {
    title: "Commercial",
    category: "commercial",
  },
  {
    title: "Creative Edits",
    category: "creative",
  },
];

export default function PortfolioPage() {
  pageTitle("Portfolio");
  const [active, setActive] = useState("all");
  const [itemShow, setItemShow] = useState(19); // Show first 8 rows (approximately 20 images)
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Transform portfolio data for ImagePopup component
  const popupImages = portfolioData.map((item, index) => ({
    image: item.src,
    imgTitle: `Portfolio Image ${index + 1}`,
  }));

  // Handlers for ImagePopup
  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleClosePopup = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % portfolioData.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + portfolioData.length) % portfolioData.length,
    );
  };

  return (
    <>
      <PageHeading
        title="Portfolio"
        bgSrc={portfolio_hero_bg}
        pageLinkText="Portfolio"
      />
      <Spacing lg="145" md="80" />
      <Div className="container">
        <Div className="cs-portfolio_1_heading">
          <SectionHeading title="Some recent work" subtitle="Our Portfolio" />
          <Div className="cs-filter_menu cs-style1">
            <ul className="cs-mp0 cs-center">
              <li className={active === "all" ? "active" : ""}>
                <span onClick={() => setActive("all")}>All</span>
              </li>
              {categoryMenu.map((item, index) => (
                <li
                  className={active === item.category ? "active" : ""}
                  key={index}
                >
                  <span onClick={() => setActive(item.category)}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </Div>
        </Div>
        <Spacing lg="90" md="45" />
        <Div className="row">
          <AnimatePresence mode="sync">
            {portfolioData.slice(0, itemShow).map((item, index) => (
              <motion.div
                className={`${
                  index % 7 === 3 || index % 7 === 6 ? "col-lg-8" : "col-lg-4"
                } ${
                  active === "all"
                    ? ""
                    : !(active === item.category)
                      ? "d-none"
                      : ""
                }`}
                key={`portfolio-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
              >
                <PortfolioCardForPortfolioPage
                  src={item.src}
                  variant="cs-style1 cs-type1"
                  onClick={() => handleImageClick(index)}
                />
                <Spacing lg="25" md="25" />
              </motion.div>
            ))}
          </AnimatePresence>
        </Div>

        <Div className="text-center">
          {portfolioData.length > 20 && (
            <>
              <Spacing lg="65" md="40" />
              <span
                className="cs-text_btn border px-3 py-2 transition ease-in-out duration-300"
                onClick={() => {
                  if (isExpanded) {
                    setItemShow(19); // Show first 8 rows
                    setIsExpanded(false);
                  } else {
                    setItemShow(portfolioData.length); // Show all 32 rows
                    setIsExpanded(true);
                  }
                }}
              >
                <span>{isExpanded ? "See Less" : "See More"}</span>
                {isExpanded ? (
                  <ChevronsUpIcon size={18} />
                ) : (
                  <ChevronsDownIcon size={18} />
                )}
              </span>
            </>
          )}
        </Div>
      </Div>
      <Spacing lg="145" md="80" />
      {/* <Cta title="agency@arino.com" bgSrc={cta_bg_2} variant="rounded-0" /> */}

      {/* Image Popup */}
      <ImagePopup
        images={popupImages}
        selectedIndex={selectedImageIndex}
        onClose={handleClosePopup}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </>
  );
}
