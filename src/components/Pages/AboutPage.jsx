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
    factNumber: '285',
  },
  {
    title: 'Happy Clients',
    factNumber: '143',
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
              title="A studio for moments worth keeping"
              subtitle="About Error Studio"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Error Studio is based in Cuddalore. We photograph weddings and events and make films, edits and albums. We plan the shoot with you, capture the people and details, then shape the photographs and footage into work you can return to.
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
              title="From first conversation to final work"
              subtitle="Our Approach"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Tell us about the occasion, people and place. We plan the coverage together, make the photographs or film, then edit the work and prepare the final images, film or album for the project you chose.
              </p>
              <Spacing lg="15" md="15" />
              <p className="cs-m0">
                These real shoot photos and our portfolio show the work itself. If you have a date in mind, ask us about availability.
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
          btnText="Enquire about your shoot"
          btnLink="/contact"
          bgSrc={ctaBg}
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
              }
