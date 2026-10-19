import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/portfolio/00-(6).webp";
import inlineGettingReady from "../../assets/images/client-2026-09/e283b9f8.webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails5() {
  pageTitle("Wedding Day Photography Timeline");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Wedding day photography timeline"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Couple in traditional Tamil wedding attire with garlands on their wedding day, photographed by Error Studio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">19 Oct 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  What a Full Wedding-Day Photography Timeline Actually Looks Like
                </h2>
                <p>
                  Couples often book photography for "the wedding" and then realise the day is not one event but many small ones, each with its own light, crowd and emotion. Here is how a typical wedding day unfolds from a photographer's side, and what is happening with the cameras at each stage. Timings shift with your muhurtham and your family's plans, but the shape of the day is remarkably consistent.
                </p>

                <h3>Before sunrise: getting ready</h3>
                <p>
                  For a morning muhurtham, the day starts hours before the ceremony. This is some of the best candid time of the whole wedding: the bride's makeup and jewellery going on, the groom's veshti and last-minute nervousness, parents running the house, friends laughing in the background. The light is soft, the mood is real, and nobody is performing for the camera yet. We always ask couples to keep this window in the plan, because these frames are impossible to recreate later.
                </p>
                <img src={inlineGettingReady} alt="Bride getting ready with jewellery and flowers before the wedding ceremony, photographed by Error Studio" className="w-100 cs-radius_15" />
                <Spacing lg="40" md="30" />

                <h3>The muhurtham: the ceremony itself</h3>
                <p>
                  This is where traditional coverage earns its place. The rituals move fast and happen once: the garland exchange, the thaali, the blessings, the key moments your priest calls out. There is no retake. Our team positions for the ritual angles in advance, and while one shooter covers the formal record, another catches the candid side: a parent's face, the couple's glance, the crowd's reaction.
                </p>
                <p>
                  One practical tip: tell your photographer the exact muhurtham time and the ritual order your family follows. Every family and every temple or hall does it slightly differently, and five minutes of planning the night before saves missed moments on the day.
                </p>

                <h3>After the ceremony: family groups</h3>
                <p>
                  Right after the rituals come the stage photos, and this is the part that always takes longer than anyone expects. Every family wants a frame with the couple, and that is exactly how it should be. We run these like a friendly queue: quick, organised and warm, so elders are not standing around tired. This is also when we take the formal couple portraits on stage, while the decorations and flowers are still fresh.
                </p>

                <h3>Afternoon: the couple session</h3>
                <p>
                  If the schedule allows, we steal the couple for a short session away from the crowd, sometimes at the venue, sometimes a nearby spot. Twenty relaxed minutes here produces the frames couples end up printing large. Midday sun is harsh, so we look for shade, corridors, trees or indoor light. If the wedding is an evening one, this session moves to golden hour instead, which is even better.
                </p>

                <h3>Evening: reception and celebration</h3>
                <p>
                  The reception has a completely different energy: stage greetings, friends, music, dancing, the couple finally relaxing. Candid coverage leads here. The cinematic film team collects most of its favourite footage in these hours: entrances, reactions, the fun between the formal moments.
                </p>

                <h3>After the day: what happens to your photos</h3>
                <p>
                  The work does not end when the lights go off. Selection, colour grading, album design and the film edit all happen after the day, and this is where delivery discipline matters. Ask any photographer you book, including us, two questions before you pay: when will I get my photos, and when will I get my album and film? A clear answer before the wedding is the best protection you have.
                </p>
                <p>
                  At Error Studio, Cuddalore, we plan this timeline with every couple before the wedding, so the day runs smooth and nothing important is missed. Weddings, receptions, engagements and pre-weddings across Tamil Nadu. Call or WhatsApp us on <a href="tel:+919944036606">99440 36606</a>.
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
