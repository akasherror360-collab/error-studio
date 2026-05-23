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
import post3 from "../../assets/images/website/Instagram Posters/11-(4).webp";
import ctaBg from "../../assets/images/cta_bg.jpeg";

// Blog data from home page PostSlider
const postData = [
  {
    thumb: post1,
    title: "How to keep fear from ruining your art business with confident",
    subtitle:
      "Discover practical strategies to overcome fear and build confidence in your creative business. Learn how successful artists and photographers maintain their composure while growing their brand and connecting with clients.",
    date: "07 Mar 2022",
    category: "Business",
    categoryHref: "/blog",
    href: "/blog/how-to-keep-fear-from-ruining-your-art-business-with-confident",
  },
  {
    thumb: post2,
    title: "Artistic mind will be great for creation anything",
    subtitle:
      "Explore the power of creative thinking in photography and videography. Understanding how to harness your artistic vision can transform ordinary moments into extraordinary visual stories that resonate with your audience.",
    date: "10 Feb 2022",
    category: "Photography",
    categoryHref: "/blog",
    href: "/blog/artistic-mind-will-be-great-for-creation-anything",
  },
  {
    thumb: post3,
    title: "A.I will take over all job for human within next year",
    subtitle:
      "An in-depth look at how artificial intelligence is reshaping the creative industry. Learn how photographers and videographers can adapt and leverage AI tools to enhance their workflow while maintaining their unique artistic voice.",
    date: "05 Mar 2022",
    category: "Tech",
    categoryHref: "/blog",
    href: "/blog/ai-will-take-over-all-job-for-human-within-next-year",
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
          title="Let’s disscuse make <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
    </>
  );
}
