import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Card from '../Card';
import FunFact from '../FunFact';
import Hero from '../Hero';
import Div from '../Div';
import SectionHeading from '../SectionHeading';
import Spacing from '../Spacing';
import Cta from '../Cta';
import LogoList from '../LogoList';
import MovingText from '../MovingText';
import PortfolioSlider from '../Slider/PortfolioSlider';
import PostSlider from '../Slider/PostSlider';
import TestimonialSlider from '../Slider/TestimonialSlider';
import TeamSlider from '../Slider/TeamSlider';
import VideoModal from '../VideoModal';
import TimelineSlider from '../Slider/TimelineSlider';
import { pageTitle } from '../../helper';
import hero_bg from '../../assets/images/hero_bg.jpeg';
import service_1 from '../../assets/images/website/Instagram Posters/5-(1).webp';
import service_2 from '../../assets/images/website/Instagram Posters/16-(3).webp';
import service_3 from '../../assets/images/website/Instagram Posters/00-(4).webp';
import service_4 from '../../assets/images/website/Instagram Posters/14-(8).webp';
import portfolio_1 from '../../assets/images/website/Best Work/Best Album/12x36/21.webp';
import portfolio_2 from '../../assets/images/website/Best Work/Best Album/12x36/35.webp';
import portfolio_3 from '../../assets/images/website/Best Work/Best Album/12x36/44.webp';
import portfolio_4 from '../../assets/images/website/Best Work/Best Album/12x36/42-(4).webp';
import portfolio_5 from '../../assets/images/website/Best Work/Best Album/12x36/49-(2).webp';
import contact_side_img from '../../assets/images/website/Instagram Posters/11-(3).webp';

import video_bg from '../../assets/images/website/Best Work/Best Album/12x36/22.webp';
import cta_bg from '../../assets/images/cta_bg.jpeg';
// Hero Social Links
const heroSocialLinks = [
  {
    name: 'Instagram',
    links: 'https://www.instagram.com/errorstudio.official?igsh=MXExdHRrMDcweXlrNA%3D%3D&utm_source=qr',
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
const portfolioData = [
  {
    title: 'Wedding at The Grand Line',
    subtitle: 'Candid Photography',
    href: '/portfolio/portfolio-details',
    src: portfolio_1,
  },
  {
    title: 'Corporate Tech Summit',
    subtitle: 'Event Coverage',
    href: '/portfolio/portfolio-details',
    src: portfolio_2,
  },
  {
    title: 'Essence of Maternity',
    subtitle: 'Portrait Session',
    href: '/portfolio/portfolio-details',
    src: portfolio_3,
  },
  {
    title: 'Urban Fashion',
    subtitle: 'Commercial Shoot',
    href: '/portfolio/portfolio-details',
    src: portfolio_4,
  },
  {
    title: 'Urban Fashion',
    subtitle: 'Commercial Shoot',
    href: '/portfolio/portfolio-details',
    src: portfolio_5,
  },
  {
    title: 'Urban Fashion',
    subtitle: 'Commercial Shoot',
    href: '/portfolio/portfolio-details',
    src: portfolio_4,
  },
  {
    title: 'Urban Fashion',
    subtitle: 'Commercial Shoot',
    href: '/portfolio/portfolio-details',
    src: portfolio_5,
  },
  {
    title: 'Urban Fashion',
    subtitle: 'Commercial Shoot',
    href: '/portfolio/portfolio-details',
    src: portfolio_4,
  },
  {
    title: 'Urban Fashion',
    subtitle: 'Commercial Shoot',
    href: '/portfolio/portfolio-details',
    src: portfolio_5,
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
        bgImageUrl={hero_bg}
      />
      {/* End Hero Section */}

      {/* Start FunFact Section */}
      <div className="container">
        <FunFact
          variant="cs-type1"
          title="Our Numbers Speak"
          subtitle="We take pride in our journey. Every project is a testament to our dedication and quality."
          data={funfaceData}
        />
      </div>
      {/* End FunFact Section */}

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
              <Div className="row">
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Wedding Photography"
                    link="/service/wedding-photography"
                    src={service_1}
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Cinematic Videography"
                    link="/service/videography"
                    src={service_2}
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Creative Editing"
                    link="/service/video-editing"
                    src={service_3}
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Brand & Commercial"
                    link="/service/commercial"
                    src={service_4}
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Service Section */}

      {/* Start Portfolio Section */}
      <Spacing lg="150" md="50" />
      <Div>
        <Div className="container">
          <SectionHeading
            title="Portfolio to explore"
            subtitle="Latest Projects"
            variant="cs-style1 text-center"
          />
          <Spacing lg="90" md="45" />
        </Div>
        <PortfolioSlider data={portfolioData} />
      </Div>
      {/* End Portfolio Section */}

      {/* Start Journey Section */}
      <Spacing lg="150" md="80" />
      <Div className="cs-shape_wrap_2">
        <Div className="cs-shape_2">
          <Div />
        </Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title="We Built Our Legacy"
                subtitle="Our Journey"
                variant="cs-style1"
              />
              <Spacing lg="90" md="45" />
            </Div>
            <Div className="col-xl-7 offset-xl-1">
              <TimelineSlider />
            </Div>
          </Div>
        </Div>
      </Div>
      {/* End Journey Section */}

      {/* Start Video Block Section */}
      <Spacing lg="130" md="70" />
      <Div className="container">
        <h2 className="cs-font_50 max-w-6xl mx-auto cs-m0 text-center cs-line_height_4">
          Our agile process is ability to adapt and respond to change. 
        </h2>
        <Spacing lg="70" md="70" />
        <VideoModal
          videoSrc="https://youtu.be/6kZ7cwzcxic?si=3TZi7wuOZ2Yz1Hqf"
          bgUrl={video_bg}
        />
      </Div>
      {/* End Video Block Section */}

      {/* Start Team Section */}
      <Spacing lg="145" md="80" />
      <Div className="container">
        <SectionHeading
          title="Awesome team <br/>members"
          subtitle="Our Team"
          variant="cs-style1"
        />
        <Spacing lg="85" md="45" />
        <TeamSlider />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End Team Section */}

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

      {/* Start MovingText Section */}
      <Spacing lg="125" md="70" />
      <MovingText text="Our reputed world wide partners" />
      <Spacing lg="105" md="70" />
      {/* End MovingText Section */}

      {/* Start LogoList Section */}
      <Div className="container">
        <LogoList />
      </Div>
      <Spacing lg="150" md="80" />
      {/* End LogoList Section */}

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
