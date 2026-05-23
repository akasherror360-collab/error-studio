import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import post1 from "../../assets/images/website/Instagram Posters/0-(4).webp";
import blogDetailsImg1 from "../../assets/images/blog_details_img_1.jpeg";
import blogDetailsImg2 from "../../assets/images/blog_details_img_2.jpeg";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetailsPage() {
  const params = useParams();
  pageTitle("Blog Details");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* Start Page Heading Section */}
      <PageHeading
        title="Blog asdfasfas"
        bgSrc={blogDetailsHeroBg}
        pageLinkText={params.blogDetailsId}
      />
      {/* End Page Heading Section */}

      {/* Start Blog Details */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            {/* Start Details Post Content */}
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={post1} alt="Post" className="w-100 cs-radius_15" />
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
                  essential for long-term success. These cases are perfectly
                  simple and easy to distinguish when you have the right
                  framework and support system in place.
                </p>
                {/* <Div className="row">
                  <Div className="col-md-6">
                    <img
                      src={blogDetailsImg1}
                      alt="Blog Details"
                      className="cs-radius_15 w-100"
                    />
                    <Div className="cs-height_45 cs-height_lg_45" />
                  </Div>
                  <Div className="col-md-6">
                    <img
                      src={blogDetailsImg2}
                      alt="Blog Details"
                      className="cs-radius_15 w-100"
                    />
                    <Div className="cs-height_45 cs-height_lg_45" />
                  </Div>
                </Div> */}
                <h3>Building Confidence Through Action</h3>
                <p>
                  Taking consistent action towards your business goals is the
                  most effective way to build confidence. Start by setting
                  small, achievable milestones that lead to larger objectives.
                  Each completed project, satisfied client, and positive review
                  reinforces your belief in your abilities. Remember that every
                  successful creative professional started exactly where you are
                  now, with doubts and uncertainties. The difference is they
                  chose to push through the fear and take action.
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
            {/* End Details Post Content */}
          </Div>
          <Div className="col-xl-3 col-lg-4 offset-xl-1">
            {/* Start Sidebar */}
            <Spacing lg="0" md="80" />
            <Sidebar />
            {/* End Sidebar */}
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
      {/* Start Blog Details */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Let’s disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
