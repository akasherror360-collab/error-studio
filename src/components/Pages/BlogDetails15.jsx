import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/portfolio/4-(2).webp";
import inlineDetails from "../../assets/images/website/portfolio/14-(1).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails15() {
  pageTitle("Family Group Photos");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Family group photos"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Family group portrait with parents and their son, by Error Studio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">08 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  Family Group Photos at Your Wedding: How to Get Them Done Without the Chaos
                </h2>
                <p>
                  Family group photos are the one part of a wedding day that can quietly eat forty minutes and test everyone's patience. It does not have to go that way. Group photo sessions fail for boring, fixable reasons - no list, no wrangler, no plan. Here is how to keep a family group session short and calm, without anyone losing their smile.
                </p>

                <h3>1. Write the list before the wedding day</h3>
                <p>
                  The single biggest time-saver is a written list of groups, decided days in advance. Sit down together and write the exact combinations you want: bride with parents, groom with parents, couple with both sets of parents, couple with full families, siblings, grandparents, close friends. Ten to fifteen groups is a realistic target for a smooth session. A vague "we will figure it out on the day" is how a session balloons.
                </p>

                <h3>2. Appoint one wrangler from each side</h3>
                <p>
                  Your photographer does not know that the man near the pillar is your uncle. Choose one person from each family who knows every face, and give them the list. Their only job during the session is to gather the next group while the current one is being shot. That helps keep the next group ready and the session moving.
                </p>

                <h3>3. Pick the spot in advance</h3>
                <p>
                  Walk the venue once with photos in mind and choose the group-photo spot before the day: somewhere near the stage or dining area, with even light and a clean background. If guests have to be herded across the venue, you lose them between groups. The closer the spot is to where people already are, the faster everything moves.
                </p>
                <img src={inlineDetails} alt="Couple portrait at their wedding by Error Studio" className="w-100 cs-radius_15" />
                <Spacing lg="40" md="30" />

                <h3>4. Put it in the schedule where people actually are</h3>
                <p>
                  The easiest time for full-family groups is usually right after the main ceremony, before everyone disperses to eat or change. Tell close family in advance that group photos happen at that point, so nobody leaves early. If your timeline is tight, even ten planned minutes beat thirty unplanned ones.
                </p>

                <h3>5. Order the groups smartly</h3>
                <p>
                  Start with elderly grandparents and anyone who cannot stand for long, so they can sit down or leave early. Do the largest groups first while everyone is present, then peel people away into smaller combinations. Keep the couple in place and rotate family members around them - moving two people is usually faster than moving twenty.
                </p>

                <h3>6. Keep each group under two minutes</h3>
                <p>
                  A good rhythm is: group assembles, one formal frame, one candid frame, next group. If you want variations, pick two or three favourite groups for extra poses rather than repeating every combination. Speed is not rude. Guests enjoy a brisk session far more than a slow one.
                </p>

                <h3>A quick checklist</h3>
                <p>Written group list finalised before the wedding week.</p>
                <p>One wrangler chosen from each family, list in hand.</p>
                <p>Photo spot picked near where guests gather.</p>
                <p>Session placed right after the main ceremony.</p>
                <p>Elders and large groups scheduled first.</p>
                <p>Two or three favourite groups marked for extra frames.</p>

                <h3>Planning your wedding photography?</h3>
                <p>
                  A calm family-photo session is one of the things a little planning buys you. Message us on WhatsApp at <a href="https://wa.me/919944036606">+91 99440 36606</a> with your date and family size, and plan the photography around your day. We shoot weddings across Cuddalore, Villupuram, Pondicherry and the rest of Tamil Nadu.
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
