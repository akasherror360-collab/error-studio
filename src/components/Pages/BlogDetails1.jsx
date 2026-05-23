import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/Instagram Posters/0-(4).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails1() {
  pageTitle("How to Keep Fear From Ruining Your Art Business");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="How to keep fear from ruining your art business with confident"
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
                  <span className="cs-posted_by">07 Mar 2022</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Business
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  How to keep fear from ruining your art business with confident
                </h2>
                <p>
                  Discover practical strategies to overcome fear and build
                  confidence in your creative business. Learn how successful
                  artists and photographers maintain their composure while
                  growing their brand and connecting with clients. Fear is one
                  of the most common barriers that prevent talented creatives
                  from achieving their full potential in business.
                </p>
                <blockquote className="cs-primary_font">
                  Success in creative business comes not from the absence of
                  fear, but from the courage to move forward despite it. Your
                  unique perspective and artistic vision are what set you apart
                  in the marketplace.
                  <small>Sarah Mitchell</small>
                </blockquote>
                <p>
                  On the other hand, we must acknowledge that building a
                  sustainable creative business requires both artistic talent
                  and business acumen. Many photographers and videographers
                  excel at their craft but struggle with the business aspects
                  such as pricing, marketing, and client management.
                  Understanding how to balance creativity with commerce is
                  essential for long-term success.
                </p>

                <h3>Building Confidence Through Action</h3>
                <p>
                  Taking consistent action towards your business goals is the
                  most effective way to build confidence. Start by setting
                  small, achievable milestones that lead to larger objectives.
                  Each completed project, satisfied client, and positive review
                  reinforces your belief in your abilities. Remember that every
                  successful creative professional started exactly where you are
                  now, with doubts and uncertainties.
                </p>
                <p>
                  Additionally, surrounding yourself with a supportive community
                  of fellow creatives can make a tremendous difference. Share
                  your challenges, celebrate your wins, and learn from others'
                  experiences. This collaborative approach not only reduces
                  feelings of isolation but also provides practical insights and
                  encouragement during difficult times.
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
