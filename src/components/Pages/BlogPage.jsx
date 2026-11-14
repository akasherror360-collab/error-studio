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
import post9 from "../../assets/images/website/portfolio/8-(5).webp";
import post10 from "../../assets/images/website/portfolio/13-(7).webp";
import post11 from "../../assets/images/website/carousel/02.jpg";
import post12 from "../../assets/images/website/portfolio/1-(3).webp";
import post13 from "../../assets/images/website/portfolio/18-(10).webp";
import post14 from "../../assets/images/website/portfolio/8-(1).webp";
import post15 from "../../assets/images/website/portfolio/4-(2).webp";
import post16 from "../../assets/images/website/Instagram Posters/1-(5).webp";
import post17 from "../../assets/images/website/Instagram Posters/10-(2).webp";
import post18 from "../../assets/images/website/Instagram Posters/11-(2).webp";
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
  {
    thumb: post9,
    title: "How to choose a wedding photographer in Cuddalore: what to check before you book",
    subtitle:
      "Full galleries over highlights, who actually shows up, delivery timelines in writing, backup plans and why local knowledge wins - a practical checklist before you book.",
    date: "27 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/how-to-choose-wedding-photographer-cuddalore",
  },
  {
    thumb: post10,
    title: "Cinematic wedding films: what they are and how they differ from regular wedding video",
    subtitle:
      "Traditional record vs cinematic story, what actually decides film quality, and the questions to ask before you book a film team.",
    date: "29 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/cinematic-wedding-films-explained",
  },
  {
    thumb: post11,
    title: "Reception stage and venue prep: how decor and lighting change your wedding photos",
    subtitle:
      "Stage lighting colour, LED wall flicker, backdrop clutter and hall layout - the small venue decisions that decide how your reception photos look.",
    date: "31 Oct 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/reception-stage-venue-prep-photos",
  },
  {
    thumb: post12,
    title: "Planning wedding photos in Cuddalore's monsoon season",
    subtitle:
      "Northeast monsoon weddings need windows, covered backups and small buffers - how to keep rain from ruling your wedding day photos.",
    date: "02 Nov 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/monsoon-wedding-photo-planning-cuddalore",
  },
  {
    thumb: post13,
    title: "Haldi and mehndi photography tips for Cuddalore weddings",
    subtitle:
      "Light, backdrops, mehndi close-ups, planning for the mess and twenty quiet minutes for couple portraits - how we shoot haldi and mehndi ceremonies across Cuddalore, Villupuram and Pondicherry.",
    date: "04 Nov 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/haldi-mehndi-photography-tips",
  },
  {
    thumb: post14,
    title: "Golden hour portraits: making the most of outdoor light on your wedding day",
    subtitle:
      "Why the low evening light flatters portraits, how to plan a twenty-minute window around sunset, open-sky spots near your venue, and backups when the timing does not cooperate.",
    date: "06 Nov 2026",
    category: "Shoot Tips",
    categoryHref: "/blog",
    href: "/blog/golden-hour-wedding-portraits-cuddalore",
  },
  {
    thumb: post15,
    title:
      "Family group photos at your wedding: how to get them done without the chaos",
    subtitle:
      "The written group list, two family wranglers, the right spot and order, and a two-minute rhythm - how to keep family group photos short and calm.",
    date: "08 Nov 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/family-group-photos-wedding-tips",
  },
  {
    thumb: post16,
    title:
      "Wedding teaser vs full wedding film: what is the difference and which do you need?",
    subtitle:
      "What a teaser does, what a full film covers, how to choose between them, and the questions to ask before you book your wedding video.",
    date: "10 Nov 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/wedding-teaser-vs-full-wedding-film",
  },
  {
    thumb: post17,
    title: "What to ask your wedding photographer before you book",
    subtitle:
      "Deliverables, timelines, the team on the day, money terms, photo usage rights, and why to get it all in writing - the questions that prevent booking regrets.",
    date: "12 Nov 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/what-to-ask-wedding-photographer-before-booking",
  },
  {
    thumb: post18,
    title: "Your muhurtham time is fixed: how to plan wedding photography around it",
    subtitle:
      "Backward planning from the muhurtham time: makeup and travel slots, hall lighting, family photo blocks, the same-day reception gap, and one person in charge of the clock.",
    date: "14 Nov 2026",
    category: "Wedding Guide",
    categoryHref: "/blog",
    href: "/blog/muhurtham-time-wedding-photography-planning",
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
