import React, { useEffect } from 'react';
import EnquiryForm from './EnquiryForm';
import { pageTitle } from '../../helper';
import Div from '../Div';
import PageHeading from '../PageHeading';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import ContactInfoWidget from '../Widget/ContactInfoWidget';
import contactHeroBg from '../../assets/images/contact_hero_bg.jpeg';

export default function ContactPage() {
  pageTitle('Contact Us');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageHeading
        title="Contact Us"
        bgSrc={contactHeroBg}
        pageLinkText="Contact"
      />
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-6">
            <SectionHeading
              title="Check availability for your shoot"
              subtitle="Get in Touch"
            />
            <Spacing lg="55" md="30" />
            <ContactInfoWidget withIcon />
            <Spacing lg="0" md="50" />
          </Div>
          <Div className="col-lg-6">
            <EnquiryForm />
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
      <Div className="cs-google_map">
        <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.227453399329!2d79.7341211!3d11.7490204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54a3cf0c1e995b%3A0x40fd3cb33843c7f1!2sERROR%20STUDIO!5e0!3m2!1sen!2sus!4v1790536231370!5m2!1sen!2sus"
          allowFullScreen
          title="Google Map"
        />
      </Div>
      <Spacing lg="50" md="40" />
    </>
  );
}
