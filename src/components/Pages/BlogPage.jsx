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
