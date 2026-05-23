import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/Instagram Posters/8-(2).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails2() {
  pageTitle("Artistic Mind Will Be Great for Creation Anything");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Artistic Mind Will Be Great for Creation Anything"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Post" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">10 Feb 2022</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Photography
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  Artistic mind will be great for creation anything
                </h2>
                <p>
                  Explore the power of creative thinking in photography and
                  videography. Understanding how to harness your artistic vision
                  can transform ordinary moments into extraordinary visual
                  stories that resonate with your audience. The creative mind
                  sees potential where others see only the mundane.
                </p>
                <blockquote className="cs-primary_font">
                  Art is not about what you see, but about what you make others
                  see. A truly artistic mind doesn't just capture moments — it
                  sculpts emotions and evokes feelings that transcend the
                  boundaries of the frame.
                  <small>Elena Vasquez</small>
                </blockquote>
                <p>
                  The relationship between creativity and technical mastery is
                  a delicate balance. Great photographers and videographers know
                  that understanding their tools deeply is what sets them free
                  artistically. When you no longer think about exposure
                  settings or focal lengths, your mind is liberated to focus
                  entirely on the story you're telling.
                </p>
                {/* */}
                <h3>Cultivating Your Creative Vision</h3>
                <p>
                  Developing a distinctive artistic voice takes time, study, and
                  relentless experimentation. Study the masters of photography
                  and visual art, but don't mimic them — let their work inspire
                  you to discover your own unique perspective. Your life
                  experiences, cultural background, and personal values are the
                  raw materials from which genuine artistry is forged.
                </p>
                <p>
                  Creative blocks are natural and inevitable. When you find
                  yourself stuck, step away from your camera and engage with
                  other forms of art — music, writing, painting. Cross-pollinating
                  your creative influences often unlocks breakthroughs that
                  purely technical practice never could. The artistic mind thrives
                  on diverse input and unexpected connections.
                </p>
              </Div>
            </Div>
          </Div>
          <Div className="col-xl-3 col-lg-4 offset-xl-1">
            <Spacing lg="0" md="80" />
            <Sidebar />
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let's disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
    </>
  );
}
