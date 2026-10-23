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
import inlineEngagement from "../../assets/images/website/portfolio/1-(1).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails7() {
  pageTitle("Engagement and Reception Photography");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Engagement and reception photography"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Couple in matching outfits dancing outdoors during a couple shoot by Error Studio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">23 Oct 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  Engagement and Reception Photography: Coverage Tips for Couples
                </h2>
                <p>
                  A wedding has one ceremony at its heart, but the celebrations around it are their own events. The engagement (nichayathartham) and the reception each have their own light, their own pace and their own kind of moments. Couples who plan these two well end up with a far richer set of memories than couples who treat them as an afterthought. Here is what genuinely helps, from behind the camera.
                </p>

                <h3>Engagement: a small event with big emotions</h3>
                <p>
                  The engagement is usually the most relaxed function of the whole wedding season. The guest list is smaller, the schedule is gentler, and nobody is rushing to a muhurtham time. That calm is exactly why engagement photos are special: people are simply themselves.
                </p>
                <p>
                  A few things that improve engagement coverage:
                </p>
                <p>
                  If any part of the function is outdoors or near windows, plan it for daylight hours. Natural light is kinder than tube light, and the photos show it.
                </p>
                <p>
                  Tell your photographer who the important people are. Grandparents, the friend who introduced the couple, the uncle everyone respects: these frames matter later.
                </p>
                <p>
                  Keep ten quiet minutes after the ring exchange just for the two of you. That small window gives the photographer the couple portraits that families frame.
                </p>
                <img src={inlineEngagement} alt="Couple portraits at a traditional home by Error Studio" className="w-100 cs-radius_15" />
                <Spacing lg="40" md="30" />

                <h3>Reception: a stage event with a hundred small stories</h3>
                <p>
                  The reception is the opposite energy: a stage, a queue of guests, lights, music and a crowd that keeps moving. The planned photos happen on stage, but the reception's best photos usually happen off it: friends laughing at the back, children running between chairs, relatives meeting after years.
                </p>
                <p>
                  What helps reception coverage:
                </p>
                <p>
                  Share the stage and lighting plan with your photographer before the day. Stage lighting that looks fine to the eye can be harsh or coloured on camera, and a photographer who knows the setup in advance can work around it.
                </p>
                <p>
                  Plan the couple's entry and the first ten minutes. Once the queue of guests begins, the couple rarely gets a free minute again.
                </p>
                <p>
                  Assign one family member to gather people for stage group photos. This single decision saves more time than anything else on reception day.
                </p>
                <p>
                  If a dance, a performance or a surprise video is planned, tell the photography team. Surprises are wonderful for guests, and useless if the camera is pointed the other way.
                </p>

                <h3>One team across all your events</h3>
                <p>
                  When the same photography team covers your engagement, wedding and reception, the coverage improves each time. The team already knows your families, your important people and your preferences, and the final galleries and album read like one story instead of three separate shoots.
                </p>
                <p>
                  At Error Studio, Cuddalore, we cover engagements, weddings, receptions and every function in between, across Cuddalore, Villupuram and Pondicherry. Call or WhatsApp us on <a href="tel:+919944036606">99440 36606</a>.
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
