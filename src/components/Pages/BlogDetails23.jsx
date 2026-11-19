import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/Instagram Posters/14-(1).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails23() {
  pageTitle("Pondicherry Pre-Wedding Shoot Planning");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Pondicherry pre-wedding planning"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Wedding couple portrait from the existing Error Studio portfolio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">19 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">Pre-Wedding Shoot in Pondicherry: A Planning Guide for Cuddalore Couples</h2>
                <p>A Pondicherry pre-wedding shoot can combine heritage-street backgrounds with the seafront. For couples starting in Cuddalore, the useful question is not how many landmarks to fit in, but how to plan a comfortable session around travel, access, light and the photographs you want.</p>
                <p>Yatra lists the Cuddalore-to-Puducherry road distance at approximately 23 km. Treat that as a city-to-city guide, not the distance from your home to a chosen shoot spot. Your route, pickup point, traffic and stops change the journey. Check the route for your actual date and leave a buffer rather than relying on a fixed driving time.</p>

                <h3>Choose a look before choosing the stops</h3>
                <p><strong>Heritage streets.</strong> White Town, also called the French Quarter, is known for its coloured facades, shuttered windows and arched doorways. Share reference photographs with your photographer and agree which details suit your outfits. A building being visible from the street does not mean its doorway, courtyard or interior is available for a shoot.</p>
                <p><strong>The seafront.</strong> Discuss whether the Promenade fits the open-background look you want. Check the exact meeting point, safe shooting area and access before travel. Do not plan poses on wet rocks, near breaking waves or where equipment could obstruct pedestrians.</p>
                <p>Choose one main setting and an optional second setting instead of promising yourself a fixed number of locations. Moving the crew, finding parking and changing clothes all take time. A shorter list leaves more room for photographs and breaks.</p>

                <h3>Build a flexible session timeline</h3>
                <p>Ask your photographer to compare an early-morning plan with a late-afternoon plan for your chosen backgrounds. Agree a meeting time, setup time and a fallback if rain, strong wind or access changes the plan. Check the forecast close to the date rather than treating a season as a weather guarantee.</p>
                <p>Discuss a weekday if your dates are flexible, but do not assume empty streets. Visitor numbers, local events and everyday activity can change any day's conditions. Keep the plan workable even if people are in the background.</p>
                <p>Include water, shade and a rest break. If the plan spans morning and evening, confirm what happens during the gap and whether waiting time affects the quote. Do not assume that an all-day crew or two separate sessions are included.</p>

                <h3>Confirm access, changing space and costs</h3>
                <ul>
                  <li>Check each location with its owner or relevant authority. Ask whether professional photography, lights, tripods and video are allowed and whether a fee or booking applies.</li>
                  <li>Get permission before using a cafe, hotel, private wall or property as a planned shoot setting. A purchase alone should not be treated as shoot permission.</li>
                  <li>Arrange a private, suitable place to change. Choose an outfit count that fits the agreed session rather than assuming a standard number is included.</li>
                  <li>Confirm travel, parking, entry, room hire, makeup, extra hours and rescheduling terms in the written quote. Ask which costs are included and which are paid separately.</li>
                </ul>
                <p>These are checks to make for your specific booking, not a statement that every location charges or that one permission covers the whole city. Keep paths and entrances clear, respect residents and avoid photographing other people without their agreement.</p>

                <h3>Work backwards from how you will use the photos</h3>
                <p>If you want photographs for an invitation or reception display, share the final artwork deadline before booking the shoot. Confirm selection, editing and delivery dates with your studio, plus any separate charge for faster delivery. A shoot a few weeks before the wedding does not by itself guarantee that the finished files will be ready.</p>
                <p>Ask what edited photographs and video, if any, are included, how you will receive them and whether your intended print or online uses are covered. Avoid treating a location plan as a promise about photo quantity or delivery speed.</p>

                <h3>Send a clear planning brief</h3>
                <p>Share your preferred date, starting point in Cuddalore, reference pictures, outfit ideas, budget and any access needs. Mark the one setting that matters most. Ask for a primary plan and a practical alternative before committing to paid arrangements.</p>
                <p>For a wider comparison, see our <Link to="/blog/pre-wedding-shoot-locations-cuddalore">pre-wedding location guide</Link>. This article focuses on planning a single Pondicherry session rather than listing regional destinations.</p>

                <h3>Plan it with Error Studio</h3>
                <p>Error Studio is based in Cuddalore, Tamil Nadu. To discuss a Pondicherry pre-wedding session, call or WhatsApp <a href="https://wa.me/919944036606">99440 36606</a>. Confirm availability, travel arrangements, permissions, price and deliverables in your quotation.</p>
                <p>The photograph on this page is existing Error Studio portfolio work. It is used as a couple-portrait reference, not as evidence of a Pondicherry location.</p>

                <h3>Planning references</h3>
                <p><a href="https://www.incredibleindia.gov.in/en/puducherry/puducherry/the-french-quarter" target="_blank" rel="noopener noreferrer">Incredible India: the French Quarter</a>; <a href="https://tourism.py.gov.in/" target="_blank" rel="noopener noreferrer">Puducherry Department of Tourism</a>; and <a href="https://www.yatra.com/distance-between/distance-from-cuddalore-to-puducherry.html" target="_blank" rel="noopener noreferrer">Yatra: approximate city-to-city road distance</a>. Tourism descriptions and route estimates do not establish shoot permission or current access.</p>
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
