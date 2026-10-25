import React, { useEffect } from "react";
import { pageTitle } from "../../helper";
import Cta from "../Cta";
import PageHeading from "../PageHeading";
import PostStyle2 from "../Post/PostStyle2";
import Div from "../Div";
import Sidebar from "../Sidebar.jsx";
import Spacing from "../Spacing";
import blogHeroBg from "../../assets/images/blog_hero_bg.jpeg";
import post1 from "../../assets/images/website/Instagram Posters/0-(4).webp";
import post2 from "../../assets/images/website/Instagram Posters/8-(2).webp";
import post3 from "../../assets/images/client-2026-09/ecc79736.webp";
import post4 from "../../assets/images/website/portfolio/8-(5).webp";
import post5 from "../../assets/images/website/portfolio/00-(6).webp";
import post6 from "../../assets/images/website/portfolio/12X36/18.webp";
import post7 from "../../assets/images/website/portfolio/13-(2).webp";
import post8 from "../../assets/images/website/portfolio/9-(5).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

// Blog data from home page PostSlider
const postData = [
  {
    thumb: post1,
    title: "Wedding venues in and around Cuddalore: a couple's guide",
    subtitle:
      "Kalyana mandapams in town, beachside settings near Silver Beach, temple towns a short drive away and Pondicherry for a destination feel - how to choose the right venue and what to check before you book.",
    date: "22 Sep 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/wedding-venues-in-and-around-cuddalore",
  },
  {
    thumb: post2,
    title: "How to prepare for your wedding shoot: tips from our team",
    subtitle:
      "Share your schedule early, plan outfits the night before, use the soft evening light for couple portraits and think about your album while you shoot - practical tips from weddings we cover across Tamil Nadu.",
    date: "22 Sep 2026",
    category: "Shoot Tips",
    categoryHref: "/blog",
    href: "/blog/how-to-prepare-for-your-wedding-shoot",
  },
  {
    thumb: post3,
    title: "Pre-wedding shoot locations around Cuddalore: Silver Beach, Pichavaram and Paradise Beach",
    subtitle:
      "Three locations within about an hour of Cuddalore town, what each one looks like, the best light and timing, and a practical tip for each - plus how to choose.",
    date: "16 Oct 2026",
    category: "Shoot Tips",
    categoryHref: "/blog",
    href: "/blog/pre-wedding-shoot-locations-cuddalore",
  },
  {
    thumb: post4,
    title: "Candid vs traditional wedding photography: what is the difference and which do you need?",
    subtitle:
      "What candid and traditional coverage each do on your wedding day, what cinematic films add, and a practical split that works - from weddings we cover across Tamil Nadu.",
    date: "17 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/candid-vs-traditional-wedding-photography",
  },
  {
    thumb: post5,
    title: "What a full wedding-day photography timeline actually looks like",
    subtitle:
      "From the early getting-ready hours to the muhurtham, family groups, the couple session and the reception - how a wedding day unfolds from the photographer's side, and how to plan coverage for each part.",
    date: "19 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/wedding-day-photography-timeline",
  },
  {
    thumb: post6,
    title: "From wedding photos to wedding album: how the album design process works",
    subtitle:
      "Selection, layout, your review round and printing - how a wedding album goes from a thousand photos to a finished designed book, and how you can help it finish faster.",
    date: "21 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/wedding-album-design-process",
  },
  {
    thumb: post7,
    title: "Engagement and reception photography: coverage tips for couples",
    subtitle:
      "Light, timing, stage plans and family groups - how to plan engagement and reception coverage so no moment is missed, from weddings we cover across Tamil Nadu.",
    date: "23 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/engagement-reception-coverage-tips",
  },
  {
    thumb: post8,
    title: "Wedding and pre-wedding shoot locations in Villupuram and Pondicherry",
    subtitle:
      "White Town mornings, Rock Beach at sunrise, quieter beaches, Auroville permissions and mandapam planning - a practical guide from a team that shoots in both.",
    date: "25 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/villupuram-pondicherry-shoot-locations",
  },
];

export default function BlogPage() {
  pageTitle("Blog");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading title="Our Blogs" bgSrc={blogHeroBg} pageLinkText="Blog" />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-8">
            {postData.map((item, index) => (
              <Div key={index}>
                <PostStyle2
                  thumb={item.thumb}
                  title={item.title}
                  subtitle={item.subtitle}
                  date={item.date}
                  category={item.category}
                  categoryHref={item.categoryHref}
                  href={item.href}
                />
                {postData.length > index + 1 && <Spacing lg="95" md="60" />}
              </Div>
            ))}
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
          title="Let’s discuss making <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
    </>
  );
}
