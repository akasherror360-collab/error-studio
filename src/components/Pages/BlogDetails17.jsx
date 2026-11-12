import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/Instagram Posters/10-(2).webp";
import inlineDetails from "../../assets/images/website/Instagram Posters/14-(2).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails17() {
  pageTitle("Questions Before You Book");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Before you book"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Couple at their pre-wedding shoot by Error Studio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">12 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  What to Ask Your Wedding Photographer Before You Book
                </h2>
                <p>
                  You have shortlisted a photographer whose work you like. Before you pay an advance, one conversation can save you from most booking regrets: the one where you ask specific questions and get the answers in writing. Here is a practical set of questions to bring to that conversation.
                </p>

                <h3>1. Questions about what you will receive</h3>
                <p>
                  Start with the deliverables, because packages that sound similar can differ a lot. Ask how many edited photos you can expect, whether that is a fixed number or a range, and whether you also receive the unedited files. Ask what the video side includes: a teaser, a full film, or both, and roughly how long each will be. If an album is part of the package, ask how many pages and photos it holds and how many design revisions are included before printing.
                </p>

                <h3>2. Questions about the timeline</h3>
                <p>
                  Ask when each piece will be delivered: the first set of photos, the full gallery, the film and the album. A written schedule protects both sides. It also helps to ask what happens if delivery runs late, and how the studio will keep you updated while you wait.
                </p>

                <h3>3. Questions about the team on the day</h3>
                <p>
                  The person you speak to may not be the person holding the camera at your wedding. Ask who will actually shoot your events and whether you can see full galleries from that specific shooter's recent weddings. Ask how many photographers and videographers will be present, and what the plan is if someone falls sick or equipment fails on the day. A team that has thought about backups will answer this easily.
                </p>
                <img src={inlineDetails} alt="Bridal portrait in traditional jewellery by Error Studio" className="w-100 cs-radius_15" />
                <Spacing lg="40" md="30" />

                <h3>4. Questions about money</h3>
                <p>
                  Ask for the full price breakdown in writing: the advance, the instalments and the final payment, with dates. Ask what the cancellation and postponement terms are, especially if your date might shift with venue or muhurtham changes. If travel or accommodation could apply for outstation events, ask how those are charged so nothing surprises you later.
                </p>

                <h3>5. Questions about your photos after the wedding</h3>
                <p>
                  Your wedding photos are personal. Ask whether the studio may use your images in its portfolio and social media, and say clearly if you would rather they did not, or if only certain events are fine to share. Ask how long your files are kept after delivery, so you know how long you have to download and back them up safely.
                </p>

                <h3>6. One last thing to do</h3>
                <p>
                  Whatever you agree on, ask for it in writing: a message, an email or a simple agreement. Details that feel obvious in a conversation are easy to remember differently months later, on both sides.
                </p>

                <h3>Planning your wedding?</h3>
                <p>
                  Error Studio is happy to answer these questions before you book. Message us on WhatsApp at <a href="https://wa.me/919944036606">+91 99440 36606</a> with your date and we will walk you through our packages, deliverables and timelines. We shoot weddings across Cuddalore, Villupuram, Pondicherry and the rest of Tamil Nadu.
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
