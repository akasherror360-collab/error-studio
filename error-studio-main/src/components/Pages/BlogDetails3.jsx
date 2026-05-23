import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/Instagram Posters/11-(4).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails3() {
  pageTitle("A.I Will Take Over All Job for Human Within Next Year");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="A.I will take over all job for human within next year"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Post" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">05 Mar 2022</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Tech
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  A.I will take over all job for human within next year
                </h2>
                <p>
                  An in-depth look at how artificial intelligence is reshaping
                  the creative industry. Learn how photographers and
                  videographers can adapt and leverage AI tools to enhance their
                  workflow while maintaining their unique artistic voice. The
                  rise of generative AI has sparked both excitement and anxiety
                  among creative professionals worldwide.
                </p>
                <blockquote className="cs-primary_font">
                  AI is not the enemy of creativity — it is its newest and most
                  powerful canvas. The creatives who will thrive are those who
                  learn to collaborate with these tools rather than compete
                  against them.
                  <small>James Thornton</small>
                </blockquote>
                <p>
                  The question is not whether AI will change creative work —
                  it already has. Image generation, automatic retouching,
                  drone path planning, and intelligent video editing are just
                  the beginning. The real question is: how do we as human
                  creatives differentiate ourselves when machines can replicate
                  technical execution? The answer lies in intention, emotion,
                  and lived experience — things no AI can authentically possess.
                </p>
                <h3>Embracing AI as a Creative Partner</h3>
                <p>
                  The most forward-thinking studios are already integrating AI
                  into their workflows — not to replace their artists, but to
                  free them from repetitive, time-consuming tasks. Culling
                  thousands of images, applying consistent colour grades, and
                  generating client preview composites are all tasks that AI
                  handles more efficiently, allowing photographers to spend more
                  time on the work that truly requires a human heart.
                </p>
                <p>
                  Upskilling is no longer optional. Creatives who invest time
                  in understanding AI tools — prompt engineering, model
                  fine-tuning, workflow automation — will find themselves at
                  a significant competitive advantage. The future belongs to
                  the hybrid creative: someone who combines deep human empathy
                  and artistic intuition with fluency in the latest technology.
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
          title="Let's disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
    </>
  );
}
