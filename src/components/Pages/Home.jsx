import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Card from '../Card';
import FunFact from '../FunFact';
import Hero from '../Hero';
import Button from '../Button';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import Cta from '../Cta';
import SelectedWorks from '../SelectedWorks';
import PostSlider from '../Slider/PostSlider';
import TestimonialSlider from '../Slider/TestimonialSlider';
import Reels from '../Reels';
import reelIds from '../Reels/reelsData';
import { pageTitle } from '../../helper';
import service_1 from '../../assets/images/client-2026-09/f07214dc.webp';
import service_2 from '../../assets/images/client-2026-09/c347dc1d.webp';
import service_3 from '../../assets/images/client-2026-09/e283b9f8.webp';
import service_4 from '../../assets/images/client-2026-09/ca4c47af.webp';
import contact_side_img from '../../assets/images/website/Instagram Posters/11-(3).webp';
import why_main from '../../assets/images/website/why-temple-main.webp';
import why_secondary from '../../assets/images/website/why-temple-secondary.webp';

import cta_bg from '../../assets/images/cta_bg.jpeg';
// Hero Social Links
const heroSocialLinks = [
  {
    name: 'Instagram',
    links: 'https://www.instagram.com/errorstudio.official/',
  },
  {
    name: 'Facebook',
    links: 'https://www.facebook.com/share/1BQxvdJGY8/?mibextid=wwXIfr',
  },
  {
    name: 'Youtube',
    links: 'https://youtube.com/@errorstuido?si=69wiTCukQpkVg9dG',
  },
];

// FunFact Data
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

export default function Home() {
  pageTitle('Home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: '',
    mobile: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTygHaGbvikAfjcpi_uJeGJ2kfSN_iMV2rk4D1xoqAdjWArR53yEJ6IIlAORua2cF4wQ/exec";

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData)
      });

      setStatus({ type: 'success', message: 'Thank you! Your enquiry has been sent successfully.' });
      setFormData({ fullName: '', email: '', projectType: '', mobile: '', message: '' });
    } catch (error) {
      console.error('Submission Error:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Start Hero Section */}
      <Hero
        title="Capturing Moments. <br/>Editing Stories."
        subtitle="Professional photography and cinematic videography that transforms fleeting moments into timeless visual narratives. From customized weddings to high-impact corporate branding, we deliver excellence."
        btnText="Book Your Shoot"
        btnLink="/contact"
        scrollDownId="#service"
        heroSocialLinks={heroSocialLinks}
      />
      {/* End Hero Section */}

      {/* Start FunFact Section */}
      <div className="container">
        <FunFact
          variant="cs-type1"
          title="Our Numbers Speak"
          subtitle="What you can count on when you book your shoot with us."
          data={funfaceData}
        />
      </div>
      {/* End FunFact Section */}

      {/* Start Why Choose Section */}
      <Spacing lg="150" md="80" />
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-6 col-lg-6">
            <Div className="row">
              <Div className="col-8">
                <img src={why_main} alt="Couple at Gangaikonda Cholapuram temple, Error Studio shoot" className="w-100 cs-radius_15" />
              </Div>
              <Div className="col-4 d-flex align-items-end">
                <img src={why_secondary} alt="Couple on temple steps, Error Studio poster" className="w-100 cs-radius_15" />
              </Div>
            </Div>
            <Spacing lg="0" md="40" />
          </Div>
          <Div className="col-xl-5 offset-xl-1 col-lg-6">
            <SectionHeading
              title="Everything handled, start to finish"
              subtitle="Why Choose Us"
            >
              <Spacing lg="30" md="20" />
              <p className="cs-m0">
                Comprehensive solutions handling everything from shoot planning to final album design. With top-tier equipment and lighting, we ensure every frame is crisp and cinematic.
              </p>
              <Spacing lg="15" md="15" />
              <p className="cs-m0">
                Based in Cuddalore and shooting across Tamil Nadu, we plan your shoot with you, capture it honestly and deliver polished photos and films.
              </p>
              <Spacing lg="35" md="25" />
            </SectionHeading>
            <Button btnLink="/about" btnText="More About Us" variant="cs-type2" />
          </Div>
        </Div>
      </Div>
      {/* End Why Choose Section */}

      {/* Start Service Section */}
      <Spacing lg="150" md="80" />
      <Div id="service">
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Services we can help you with"
                subtitle="What We Do"
                btnText="See All Services"
                btnLink="/service"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-8">
              <Div className="row cs-services_grid">
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Wedding Photography"
                    link="/service/wedding-photography"
                    src={service_1}
                    alt="Wedding Photography"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Cinematic Videography"
                    link="/service/videography"
                    src={service_2}
                    alt="Cinematic Videography"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Creative Editing"
                    link="/service/video-editing"
                    src={service_3}
                    alt="Creative Editing"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Brand & Commercial"
                    link="/service/commercial"
                    src={service_4}
                    alt="Brand and Commercial"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Service Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="150" md="50" />
      <Div id="selected-works">
        <Div className="container">
          <SectionHeading
            title="Selected Works"
            subtitle="Our Portfolio"
            variant="cs-style1 text-center"
          />
          <Spacing lg="70" md="40" />
        </Div>
        <SelectedWorks />
      </Div>
      {/* End Portfolio Section */}

      {/* Start Reels Section */}
      <Spacing lg="110" md="60" />
      <Div className="container">
        <SectionHeading
          title="Watch our latest reels"
          subtitle="From Our Instagram"
          variant="cs-style1 text-center"
        />
        <Spacing lg="60" md="40" />
        <Reels data={reelIds} />
        <Spacing lg="30" md="20" />
        <Div className="text-center">
          <Button
            btnLink="/portfolio?category=reels"
            btnText="View All Reels"
            variant="cs-type2"
          />
        </Div>
      </Div>
      {/* End Reels Section */}

      {/* Journey ("our story") section removed: site copy talks only about what the customer gets.
          Two empty placeholders keep the top-level div count unchanged, because saved /admin edits use nth-of-type selectors. */}
      <div style={{ display: "none" }} aria-hidden="true" />
      <div style={{ display: "none" }} aria-hidden="true" />
      {/* End Journey Section */}

      {/* Video block temporarily removed at the owner's request. The component and assets remain available for restoration. */}

      <Spacing lg="150" md="80" />

      {/* Start Testimonial Section */}
      <TestimonialSlider />
      {/* End Testimonial Section */}

      {/* Start Blog Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="Explore recent publication"
                subtitle="Our Blog"
                btnText="View More Blog"
                btnLink="/blog"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <Div className="cs-half_of_full_width">
                <PostSlider />
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Blog Section */}

      {/* Start Contact Section */}
      <Div className="container">
        <Div className="row">
          <Div className="col-lg-6">
            <img src={contact_side_img} alt="Contact" className="w-100 cs-radius_15" style={{ height: '100%', objectFit: 'cover' }} />
          </Div>
          <Div className="col-lg-6 px-5">
            <Spacing lg="0" md="40" />
            <SectionHeading
              title="Do you have a project <br/>in your mind?"
              subtitle="Get in Touch"
            />
            <Spacing lg="55" md="30" />
            <form onSubmit={handleSubmit} className="row">
              <Div className="col-sm-6">
                <label className="cs-primary_color">Full Name*</label>
                <input 
                  type="text" 
                  name="fullName"
                  className="cs-form_field" 
                  placeholder="John Doe"
                  pattern="^[A-Za-z\s]+$"
                  title="Name should contain only letters and spaces"
                  value={formData.fullName}
                  onChange={handleChange}
                  onInput={(e) => e.target.value = e.target.value.replace(/[0-9]/g, '')}
                  required
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Email Address*</label>
                <input 
                  type="email" 
                  name="email"
                  className="cs-form_field" 
                  placeholder="example@gmail.com"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Please enter a valid email address with @"
                  value={formData.email}
                  onChange={handleChange}
                  onInput={(e) => e.target.value = e.target.value.replace(/\s/g, '')}
                  required
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Project Type*</label>
                <input 
                  type="text" 
                  name="projectType"
                  className="cs-form_field" 
                  placeholder="Wedding, Event, Commercial..."
                  pattern="^[A-Za-z\s,.-]+$"
                  title="Project type should contain only letters"
                  value={formData.projectType}
                  onChange={handleChange}
                  onInput={(e) => e.target.value = e.target.value.replace(/[0-9]/g, '')}
                  required
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-6">
                <label className="cs-primary_color">Mobile Number*</label>
                <input 
                  type="tel" 
                  name="mobile"
                  className="cs-form_field" 
                  placeholder="9999999999"
                  pattern="^[0-9]{10}$"
                  title="Mobile number should contain only 10 digits"
                  value={formData.mobile}
                  onChange={handleChange}
                  onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
                  maxLength="10"
                  required
                />
                <Spacing lg="20" md="20" />
              </Div>
              <Div className="col-sm-12">
                <label className="cs-primary_color">Tell us about your project*</label>
                <textarea
                  cols="30"
                  rows="7"
                  name="message"
                  className="cs-form_field"
                  placeholder="Brief description of your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <Spacing lg="25" md="25" />
              </Div>
              <Div className="col-sm-12">
                <button className="cs-btn cs-style1" disabled={loading}>
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  <Icon icon="bi:arrow-right" />
                </button>
                {status.message && (
                  <Div className={`cs-status_msg ${status.type === 'success' ? 'cs-success' : 'cs-error'}`} style={{ marginTop: '20px', color: status.type === 'success' ? '#00e676' : '#ff5252' }}>
                    {status.message}
                  </Div>
                )}
              </Div>
            </form>
          </Div>
        </Div>
      </Div>
      <Spacing lg="150" md="80" />
      {/* End Contact Section */}

      {/* Start CTA Section */}
      <Div className="container">
        <Cta
          title="Let’s discuss making <br /><i>Memories together</i>"
          btnText="Apply For Meeting"
          btnLink="/contact"
          bgSrc={cta_bg}
        />
      </Div>
      {/* End CTA Section */}
    </>
  );
}
