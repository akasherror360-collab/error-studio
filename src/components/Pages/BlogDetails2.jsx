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
  pageTitle("How to Prepare for Your Wedding Shoot");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="How to prepare for your wedding shoot: tips from our team"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Wedding shoot preparation tips" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">22 Sep 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Shoot Tips
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  How to prepare for your wedding shoot: tips from our team
                </h2>
                <p>
                  The difference between a stressful shoot day and a smooth one
                  is almost always preparation. After covering weddings and
                  events across Cuddalore and Tamil Nadu, these are the things
                  we see make the biggest difference for couples and families.
                </p>

                <h3>Share your schedule and must-have moments early</h3>
                <p>
                  Send your photography team the full event flow a few days
                  before - muhurtham time, reception start, family portraits,
                  any surprises planned. If there are specific moments or
                  people you want captured, list them. A short list shared
                  early is worth more than instructions shouted across a
                  crowded hall.
                </p>

                <h3>Plan outfits and accessories the night before</h3>
                <p>
                  Keep the outfits pressed, the jewellery, and every small
                  accessory in one place. On the morning of the wedding,
                  searching for a missing earring costs you the calm portrait
                  time you paid for. If you have a couple shoot planned, pick
                  outfits that work together in colour.
                </p>

                <h3>Use the soft light for couple portraits</h3>
                <p>
                  If your schedule allows an outdoor couple session, the hour
                  before sunset gives the most flattering natural light. Even
                  twenty minutes in that window produces frames that no hall
                  lighting can match. Tell us your timings and we will plan
                  the session around the light.
                </p>

                <h3>Sleep, eat and assign a coordinator</h3>
                <p>
                  It sounds simple, but tired faces show on camera. Rest well
                  the two nights before, eat something before the ceremonies
                  begin, and nominate one friend or cousin as the point person
                  for vendors - someone who can gather family members for
                  group photos while you stay in the moment.
                </p>

                <h3>Think about the album while you shoot</h3>
                <p>
                  Albums are a big part of what we deliver, so tell us which
                  moments matter most to you - they deserve the strongest
                  frames in your album layout. The more we know about what you
                  value, the closer the final album lands to what you
                  imagined.
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
          title="Let’s discuss making <br /><i>Memories together</i>"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
    </>
  );
}
