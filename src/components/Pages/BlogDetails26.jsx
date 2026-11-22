import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/portfolio/13-(2).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails26() {
  pageTitle("Engagement Photoshoot Planning");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Engagement photoshoot planning"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Engagement ceremony photograph from the existing Error Studio portfolio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">22 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">Planning Your Engagement (Nichayathartham) Photoshoot in Cuddalore</h2>
                <p>The engagement ceremony, or nichayathartham, is often the first big family function in the wedding journey. It is usually smaller than the wedding itself, but the photographs matter just as much: these are the pictures you will share when you announce the wedding date. A little planning makes the coverage smoother for everyone.</p>

                <h3>Decide what you want covered</h3>
                <p>Engagement functions vary a lot from family to family. Some are a short ring exchange at home, others fill a hall with a stage, decorations and a full guest list. Before the day, list the moments that matter to you: the ring exchange, the blessing of the couple by elders, the exchange of trays and gifts between families, group photos, and candid moments with friends. Sharing this list with your photographer a few days ahead helps nothing get missed.</p>

                <h3>Give the function a little breathing room</h3>
                <p>Short ceremonies can feel rushed if every ritual follows immediately after the last. Where possible, leave small gaps between segments. Even a few minutes between the formal rituals and the group photos gives the couple time to relax, and relaxed expressions photograph better than hurried ones. Treat any timings as suggestions, not rules: your family and priest set the actual order of events.</p>

                <h3>Think about light and space</h3>
                <ul>
                  <li>At home, pick the brightest room for the ring exchange and clear a little space near a window if you can.</li>
                  <li>In a hall, check that the stage lighting works and faces the couple rather than sitting behind them.</li>
                  <li>Keep the area directly in front of the stage clear during key moments so the photographer has a clean line of sight.</li>
                </ul>

                <h3>Plan group photos in advance</h3>
                <p>Group photos after the ceremony often take longer than expected because relatives are chatting or have stepped out. Ask one family member on each side to help gather people. A rough list, such as immediate family first, then extended family, then friends, keeps this part moving.</p>

                <h3>Outfits and details</h3>
                <p>Engagement outfits are often simpler than wedding attire, and that simplicity photographs well. If you are exchanging rings, keep the ring box somewhere easy to reach. Small details, like the invitation, the decorated trays and the flowers, are worth a few dedicated shots, so let your photographer know where they will be placed.</p>

                <h3>After the ceremony</h3>
                <p>Many couples use engagement photos for the wedding invitation and for WhatsApp announcements. If you need a few edited photos quickly for these, mention it when you book so expectations are clear on both sides.</p>

                <h3>Booking an engagement photographer in Cuddalore</h3>
                <p>Error Studio is a wedding photography and filmmaking studio based in Cuddalore, Tamil Nadu. We cover engagements, weddings, receptions and pre-wedding shoots in Cuddalore, Puducherry, Villupuram and nearby towns. To check availability for your engagement date, call or WhatsApp us on <a href="https://wa.me/919944036606">99440 36606</a>.</p>
                <p>For coverage-side tips, see our <Link to="/blog/engagement-reception-coverage-tips">engagement and reception coverage guide</Link>. The photograph on this page is existing Error Studio portfolio work, not a specific engagement.</p>
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
