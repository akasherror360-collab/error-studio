import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/Instagram Posters/11-(2).webp";
import inlineDetails from "../../assets/images/website/Instagram Posters/10-(3).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails18() {
  pageTitle("Muhurtham Wedding Planning");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Muhurtham planning"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Bride in a traditional saree getting ready by Error Studio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">14 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  Your Muhurtham Time Is Fixed: How to Plan Wedding Photography Around It
                </h2>
                <p>
                  If your wedding date was picked from the subha muhurtham list, you are in good company this season: the November-December list includes dates like November 15, 16, 20 and 29, and December 4 and 6. On a date like that, one thing on your wedding day cannot move: the muhurtham time itself. Everything else - makeup, travel, family photos, portraits - has to fit around it. A little backward planning makes the difference between a rushed morning and a calm one.
                </p>

                <h3>1. Start from the muhurtham time and work backward</h3>
                <p>
                  Once the muhurtham time is fixed, place the ceremony on a timeline and work backward. If the muhurtham is at 9 AM, decide when makeup starts, when the family should be ready, and when you want a few quiet portraits before the rituals begin. Share this timeline with your photographer early, not on the wedding morning, so the team can plan its own setup and lighting around it.
                </p>

                <h3>2. Plan for the light you will actually have</h3>
                <p>
                  Muhurtham times can fall at any hour, including early morning before sunrise. If yours is an early one, most of your ceremony photos will depend on hall lighting rather than daylight. That is fine, but it helps to tell your photographer the expected light conditions in advance, and to check whether the hall allows additional lighting near the stage. If portraits matter to you, aim to keep a short window after the ceremony, when the light outside may be softer than at midday.
                </p>

                <h3>3. Decide where family group photos fit</h3>
                <p>
                  Family photos work best when they do not compete with the rituals. You can place them right after the muhurtham, while everyone is still on stage, or after lunch, when the hall empties. Either can work. The mistake is leaving it undecided, because then the photo session starts whenever someone remembers it, usually when guests are leaving. A rough target you can discuss with your photographer is a planned block of twenty to thirty minutes with a written group list.
                </p>
                <img src={inlineDetails} alt="Couple at their outdoor pre-wedding shoot by Error Studio" className="w-100 cs-radius_15" />
                <Spacing lg="40" md="30" />

                <h3>4. If the reception is the same day, plan the gap</h3>
                <p>
                  Many couples hold the muhurtham in the morning and the reception the same evening. If that is your plan, the afternoon gap is your buffer: a short rest, a costume change, and a possible portrait window. Tell your photographer which events you want covered in the gap and which you are happy to skip, so nobody is shooting nonstop and nobody is idle when a moment happens.
                </p>

                <h3>5. Keep one person in charge of the clock</h3>
                <p>
                  On the wedding day you will not be watching the time. Pick one person - a sibling, a cousin, a friend - who knows the timeline and nudges things along. Share that person's number with your photographer before the day. When the muhurtham runs early or late, this one habit keeps the photo plan intact.
                </p>

                <h3>Getting married this season?</h3>
                <p>
                  Share your muhurtham date and time with Error Studio on WhatsApp at <a href="https://wa.me/919944036606">+91 99440 36606</a>, and we will plan the photography around your day, from the first ritual to the last reception frame. We shoot weddings across Cuddalore, Villupuram, Pondicherry and the rest of Tamil Nadu.
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
