import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogDetailsHeroBg from "../../assets/images/blog_details_hero_bg.jpeg";
import postThumb from "../../assets/images/website/portfolio/18-(10).webp";
import inlineDetails from "../../assets/images/website/portfolio/1-(4).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

export default function BlogDetails13() {
  pageTitle("Haldi and Mehndi Photography Tips");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Haldi and mehndi photography tips"
        bgSrc={blogDetailsHeroBg}
        pageLinkText="Blog Details"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            <Div className="cs-post cs-style2">
              <Div className="cs-post_thumb cs-radius_15">
                <img src={postThumb} alt="Bride with mehndi on her hands, photographed by Error Studio" className="w-100 cs-radius_15" />
              </Div>
              <Div className="cs-post_info">
                <Div className="cs-post_meta cs-style1 cs-ternary_color cs-semi_bold cs-primary_font">
                  <span className="cs-posted_by">04 Nov 2026</span>
                  <Link to="/blog" className="cs-post_avatar">
                    Wedding Guide
                  </Link>
                </Div>
                <h2 className="cs-post_title">
                  Haldi and Mehndi Photography Tips for Cuddalore Weddings
                </h2>
                <p>
                  Ask any married couple which part of their wedding they laughed through the most, and many will say the haldi or the mehndi. Turmeric on the cheeks, flowers in the hair, cousins crowding around with phones, someone pulling the groom into the frame at the wrong moment - it is the most emotional, colourful, fast-moving part of a Tamil wedding. It is also the hardest to photograph well, because the whole thing happens fast, in mixed light, in whatever space the family has chosen. Here is what we have learned shooting haldi and mehndi ceremonies across Cuddalore, Villupuram and Pondicherry.
                </p>

                <h3>1. Light first, everything else later</h3>
                <p>
                  Haldi and mehndi happen wherever the family gathers - at home, in a hall, or in a courtyard. The single best thing you can do for your photos is choose a spot with soft daylight. A courtyard in the morning, a verandah, a room with big windows - all of these give warm, even light that makes the yellow of the haldi glow. If the ceremony is indoors with tube lights, tell your photographer early so they can bring lighting. Outdoor haldi light in the morning is beautiful; harsh noon sun is not.
                </p>

                <h3>2. Keep the background simple</h3>
                <p>
                  The colours of haldi and mehndi are already loud - yellow paste, green leaves, orange marigolds, bright silk. A simple backdrop makes the couple stand out. A plain wall, a banana-leaf panel, a decorated swing, or even a clean corner with flowers works better than a cluttered stage with fifteen things behind the couple. You do not need an expensive setup. You need a tidy one.
                </p>

                <h3>3. Photograph the hands, not just the faces</h3>
                <p>
                  Mehndi lives in the details: the design on the palms, the bride's hands held out to dry, the groom's name hidden in the pattern, the moment a cousin touches up a smudge. Ask your photographer for close-ups of the mehndi itself, plus wide shots of the whole scene. Years later, the detail shots are the ones that surprise you.
                </p>

                <h3>4. Expect mess, and plan for it</h3>
                <p>
                  Haldi is not a neat ceremony. Someone will smear turmeric on someone's nose, water will spill, and the couple will end up laughing with yellow on their clothes. That is the point. Wear something you are ready to see stained, keep towels and a change of clothes nearby, and let the photographer stay close. The messy moments are the best photos.
                </p>
                <img src={inlineDetails} alt="Couple portrait in warm yellow tones by Error Studio" className="w-100 cs-radius_15" />
                <Spacing lg="40" md="30" />

                <h3>5. Candids beat posed shots here</h3>
                <p>
                  Posed couple portraits have their place, but haldi and mehndi are about movement. The best photos come from the in-between seconds: a grandmother applying haldi, friends holding the bride still for a photo, a child trying to touch the mehndi cone. Tell your photographer to stay unobtrusive and keep shooting between the planned moments.
                </p>

                <h3>6. Plan twenty quiet minutes for couple shots</h3>
                <p>
                  After the main ceremony, once the crowd thins, take twenty minutes for just the two of you. Hands with fresh mehndi, haldi still on the cheeks, both of you tired and happy - these small portraits often become the couple's favourite photos from the whole wedding. Build this time into the schedule, or it will not happen.
                </p>

                <h3>7. A short checklist for families</h3>
                <p>Choose a bright, simple spot for the ceremony.</p>
                <p>Keep flowers, towels and water ready near the couple.</p>
                <p>Tell the photographer the schedule and the family VIPs.</p>
                <p>Keep one outfit you do not mind staining.</p>
                <p>Save twenty minutes after the ceremony for couple portraits.</p>

                <h3>A final word from behind the camera</h3>
                <p>
                  Haldi and mehndi are not ceremonies you perform for the camera. They are ceremonies you enjoy, and the camera follows. A good photographer knows when to step in for a portrait and when to disappear into the crowd. If you are planning a wedding in or around Cuddalore and want your haldi and mehndi photographed this way, call or WhatsApp us on <a href="tel:+919944036606">99440 36606</a> and tell us your date. And one practical note: turmeric stains can be near-impossible to remove, so wear something you love but will not cry over.
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
