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
  pageTitle("Wedding Venues In and Around Cuddalore");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Wedding venues in and around Cuddalore: a couple's guide"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Wedding venues around Cuddalore" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">22 Sep 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  Wedding venues in and around Cuddalore: a couple's guide
                </h2>
                <p>
                  Cuddalore and its neighbouring towns offer more venue choices
                  than most couples expect. From traditional kalyana mandapams
                  in town to open-air beachside spaces and temple-town halls a
                  short drive away, the right venue depends on your guest
                  count, your ceremony style and how far your families can
                  travel. This guide walks through the main options and the
                  questions worth asking before you book.
                </p>

                <h3>Kalyana mandapams in Cuddalore town</h3>
                <p>
                  The town itself, including the Manjakuppam and Old Town
                  areas, has a good spread of marriage halls. These work well
                  for traditional ceremonies with large guest lists because
                  they usually come with dining space, stage arrangements and
                  rooms for the families. When you visit, check the hall's
                  capacity against your real guest count, the dining seating
                  per batch, parking space and power backup - a muhurtham
                  morning with a full hall is the wrong time to discover a
                  weak generator.
                </p>

                <h3>Beachside and outdoor settings</h3>
                <p>
                  Silver Beach at Devanampattinam is Cuddalore's best-known
                  stretch of coastline, and the areas along the coast suit
                  outdoor receptions and evening events. Outdoor venues give
                  beautiful natural light for photographs, especially in the
                  hour before sunset, but plan for wind, weather backup and
                  permissions where needed.
                </p>

                <h3>Temple towns a short drive away</h3>
                <p>
                  Many Cuddalore families hold the ceremony in Chidambaram,
                  around 40 km away, home to the famous Thillai Natarajar
                  temple, with halls in the town handling the reception side.
                  Neyveli and the towns towards Virudhachalam also have
                  well-used marriage halls that suit families split between
                  the two sides.
                </p>

                <h3>Pondicherry for a destination feel</h3>
                <p>
                  Pondicherry is roughly 25 km from Cuddalore, and its
                  resorts, heritage properties and beach-facing venues are a
                  popular pick for couples who want a destination-wedding feel
                  without asking guests to travel far. Book early for the peak
                  muhurtham season, because the best-located venues fill up
                  months ahead.
                </p>

                <h3>What to check before you book</h3>
                <p>
                  Whichever venue you shortlist, walk through it at the same
                  time of day as your event. Look at the light on the stage,
                  the space behind and around it for cameras and decor, and
                  the power points for lighting and sound. Ask about catering
                  policy, decoration restrictions and how long you have the
                  hall. As a photography and videography team that shoots
                  weddings across Cuddalore and Tamil Nadu, we are happy to
                  tell you what works well on camera at the venues we know -
                  just ask when you call us.
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
