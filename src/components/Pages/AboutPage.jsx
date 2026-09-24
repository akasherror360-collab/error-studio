import React, { useEffect } from 'react';
import { pageTitle } from '../../helper';
import Cta from '../Cta';
import FunFact from '../FunFact';
import PageHeading from '../PageHeading';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import aboutHeroBg from '../../assets/images/about_hero_bg.jpeg';
import aboutImg1 from '../../assets/images/website/Instagram Posters/13-(1).webp';
import aboutImg2 from '../../assets/images/website/Instagram Posters/1-(1).webp';
import aboutImg3 from '../../assets/images/website/Instagram Posters/6-(1).webp';
import aboutImg4 from '../../assets/images/website/Instagram Posters/9-(1).webp';
import ctaBg from '../../assets/images/cta_bg.jpeg';

const funfaceData = [
  {
    title: 'Projects Completed',
    factNumber: '120+',
  },
  {
    title: 'Happy Clients',
    factNumber: '100+',
  },
  {
    title: 'Years Experience',
    factNumber: '5+',
  },
  {
    title: 'Industries Served',
    factNumber: '10+',
  },
];

export default function AboutPage() {
  pageTitle('About');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {/* Start Page Heading Section */}
      <PageHeading
        title="About Us"
        bgSrc={aboutHeroBg}
        pageLinkText="About Us"
      />
      {/* End Page Heading Section */}

      {/* Start About Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-7">
            <SectionHeading
              title="Your trusted partner for visual storytelling"
              subtitle="About Error Studio"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Error Studio is a photography and post-production studio based in Tamil Nadu. You get photos and films that are sharp, well lit and full of feeling - from shoot planning to the final edit and album.
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="40" />
            </SectionHeading>
          </Div>
          <Div className="col-lg-5 offset-xl-2">
            <img
              src={aboutImg1}
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-lg-7">
            <img
              src={aboutImg2}
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
          <Div className="col-lg-5">
            <img
              src={aboutImg3}
              alt="About"
              className="w-100 cs-radius_15"
            />
            <Spacing lg="25" md="25" />
          </Div>
        </Div>
      </Div>
      <Spacing lg="75" md="55" />
      {/* End About Section */}

      {/* Start Fun Fact Section */}
      <Div className="container">
        <FunFact
          title="Our Numbers Speak"
          subtitle="What you can count on when you book your shoot with us."
          data={funfaceData}
        />
      </Div>
      {/* End Fun Fact Section */}

      {/* Start Why Choose Section */}
      <Spacing lg="100" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-image_layer cs-style1">
              <Div className="cs-image_layer_in">
                <img
                  src={aboutImg4}
                  alt="About"
                  className="w-100 cs-radius_15"
                />
              </Div>
            </Div>
            <Spacing lg="0" md="40" />
          </Div>
          <Div className="col-xl-5 offset-xl-1 col-lg-6">
            <SectionHeading
              title="Highly experienced people with us"
              subtitle="Why Choose Us"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Comprehensive solutions handling everything from shoot planning to final album design. With top-tier equipment and lighting, we ensure every frame is crisp and cinematic.
              </p>
              <Spacing lg="15" md="15" />
              <p className="cs-m0">
                Our editing team polishes every photo and video, so you get a finished result that looks professional.
              </p>
              <Spacing lg="30" md="30" />
              <Div className="cs-separator cs-accent_bg"></Div>
              <Spacing lg="25" md="0" />
            </SectionHeading>
          </Div>
        </Div>
      </Div>
      {/* End Why Choose Section */}


      {/* Start CTA Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Cta
          title="Let’s discuss making <br />something <i>cool</i> together"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
