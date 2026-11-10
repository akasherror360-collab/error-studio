import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/Instagram Posters/1-(5).webp";
import inlineDetails from "../../assets/images/website/Instagram Posters/0-(1).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails16() {
  pageTitle("Teaser vs Full Film");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Teaser vs full film"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Couple at their wedding shoot by Error Studio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">10 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  Wedding Teaser vs Full Wedding Film: What Is the Difference and Which Do You Need?
                </h2>
                <p>
                  When you book video coverage for your wedding, you can ask for two different things: a short teaser and a full wedding film. They are not two lengths of the same video. They do different jobs, and knowing the difference before you book helps you spend on what you will actually watch.
                </p>

                <h3>1. What a wedding teaser is</h3>
                <p>
                  A teaser is a short, music-led edit built from the best moments of the day. As a rough guide, you can think of a teaser as running anywhere from under a minute to a few minutes. The pacing is quick, the frames are the strongest ones, and the whole piece is made to be shared: on Instagram, as a WhatsApp status, or in the family group. If you want something friends and relatives will actually finish watching on a phone, the teaser is built for that.
                </p>

                <h3>2. What a full wedding film is</h3>
                <p>
                  A full wedding film is the long record of the day. Depending on what you choose to cover, it can run anywhere from fifteen or twenty minutes to well over an hour. This is where the ceremony plays out in order, the rituals keep their real audio, and the speeches and blessings stay whole instead of cut to a beat. Years later, this is the version the family sits down and re-watches.
                </p>

                <h3>3. How to choose between them</h3>
                <p>
                  If most of your sharing happens on phones and social media, a teaser covers that need well. If your priority is preserving the muhurtham, the vows and the speeches in full, the long film is the one that does it. You can also take both, because they serve different purposes: the teaser for the week after the wedding, the full film for the years after it. If the budget allows only one, decide what you will reach for more often five years from now, and let that answer guide you.
                </p>
                <img src={inlineDetails} alt="Muhurtham ceremony moments from a wedding by Error Studio" className="w-100 cs-radius_15" />
                <Spacing lg="40" md="30" />

                <h3>4. What to confirm before you book</h3>
                <p>
                  Whichever you pick, a few questions in writing will save confusion later. Ask what length each deliverable will roughly be. Ask whether the real audio of the rituals and speeches is included, or whether everything runs under music. Ask how many rounds of changes are part of the price. Ask how the files will be delivered: a downloadable link, a pen drive, or both. And if you plan to post the teaser as a reel, ask for a vertical version, since a horizontal video cropped for reels loses the edges of the frame.
                </p>

                <h3>5. One small tip</h3>
                <p>
                  Watch a full sample, not just a teaser, before deciding on a team. A teaser can look impressive with any footage. A full film shows how the team handles the quiet, ordinary minutes of a real wedding, and that is where you see the difference.
                </p>

                <h3>Planning your wedding film?</h3>
                <p>
                  Error Studio shoots cinematic wedding films and teasers for weddings across Cuddalore, Villupuram, Pondicherry and the rest of Tamil Nadu. Message us on WhatsApp at <a href="https://wa.me/919944036606">+91 99440 36606</a> with your date, and we will walk you through the options for your day.
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
