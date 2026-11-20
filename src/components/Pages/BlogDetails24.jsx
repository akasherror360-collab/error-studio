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

export default function BlogDetails24() {
  pageTitle("Small and Intimate Wedding Photography");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Intimate wedding photography"
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
                  <span className="cs-posted_by">20 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">Planning Photography for a Small or Intimate Wedding in Cuddalore</h2>
                <p>A home function, a temple ceremony or a celebration in a compact hall can have just as many meaningful photographs to plan as a larger wedding. Start with the people, rituals and details that matter to you, rather than using the guest count alone to decide the photography coverage.</p>

                <h3>Make a short list of people and moments</h3>
                <p>Tell your photographer which family groups you want, who may need a seated portrait and whether anyone will leave early. A small guest list does not automatically mean every person will appear in the finished photographs. Share your priorities and agree when the group photographs can happen.</p>
                <p>List details with personal meaning: a family doorway, an heirloom, a decorated courtyard or something made for the ceremony. Explain why each matters, so the photographer can plan around it instead of having to guess.</p>
                <p>Choose a trusted family member to help gather people for group photographs. Discuss any sensitive family groupings privately, and share only the information needed to make the photographs comfortable for everyone.</p>

                <h3>Plan the order of events, not an assumed pace</h3>
                <p>Write down the ceremony start, key rituals, family portraits and meal or reception timings. Ask the person leading the ceremony where the photographer can stand and whether flash or movement is restricted. A small wedding can still have overlapping events or a tight sequence.</p>
                <p>If preparations happen in different places, include travel and setup time. Leave a portrait slot if couple photographs matter to you, but agree its length with the photographer and ceremony schedule. There is no fixed number of minutes that guarantees a particular set of photographs.</p>

                <h3>Choose coverage around the actual plan</h3>
                <p>A single location and non-overlapping priorities are useful starting points for discussing one photographer. They are not proof that one person can cover everything. If getting-ready photographs, guest candids and rituals happen at the same time, ask how those priorities would be divided.</p>
                <p>For a closer comparison, read our <Link to="/blog/one-or-two-wedding-photographers-cuddalore">one-versus-two wedding photographers guide</Link>. Confirm who is taking still photographs and who is handling video, rather than counting every crew member as a photographer.</p>
                <p>Discuss the hours you need, including setup, portraits and any gap between functions. Ask whether shorter or custom coverage is available, without assuming a half-day package or a lower price exists. Get the final hours, crew, extra-hour rate and deliverables in the written quotation.</p>
                <p>If voices, rituals or family messages matter to you, discuss video separately. Ask what sound recording and film editing are included. A short film is an option to compare with your priorities and budget, not something every intimate wedding needs.</p>

                <h3>Check the space and light in advance</h3>
                <p>Share current photographs of the ceremony space and the time you expect to use it. Ask your photographer where family groups and couple portraits could fit without blocking guests, entrances or the ceremony.</p>
                <p>Discuss available daylight, lamps and any extra lighting with the photographer and venue. Warm decorative lights alone do not guarantee suitable photography light. Confirm sockets, safe equipment placement and any lighting restrictions before the day.</p>
                <p>For an outdoor or courtyard function, agree an indoor or sheltered alternative and check the forecast close to the date. Keep a comfortable seated area and water available for family members waiting for portraits.</p>

                <h3>Confirm what you will receive</h3>
                <p>Before booking, ask about the edited-photo selection process, any promised quantity, delivery dates, file delivery method and album options. Do not infer these from the size of the wedding or the length of coverage. If you need a photograph quickly for a thank-you message, agree that deadline and any charge in advance.</p>
                <p>For more preparation questions, see our <Link to="/blog/what-to-ask-wedding-photographer-before-booking">wedding photographer booking checklist</Link>. The aim is a clear plan that fits your ceremony and family, not a smaller version of someone else's wedding.</p>

                <h3>Talk to Error Studio</h3>
                <p>Error Studio is based in Cuddalore, Tamil Nadu. Share your venue, date, ceremony plan and photography priorities by calling or messaging <a href="https://wa.me/919944036606">99440 36606</a>. Ask about availability and a quotation suited to your plans. Final crew, price and deliverables are those agreed in that quotation.</p>
                <p>The photograph on this page is existing Error Studio portfolio work. It does not establish the wedding's guest count or venue type.</p>

                <h3>Further reading</h3>
                <p><a href="https://www.adobe.com/creativecloud/photography/type/wedding-photography.html" target="_blank" rel="noopener noreferrer">Adobe: wedding photography planning, preparation and equipment</a>. This is a general planning reference, not Error Studio package terms.</p>
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
