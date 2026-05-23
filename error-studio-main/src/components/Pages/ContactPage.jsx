import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
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

    // REPLACE THIS with your actual Google Apps Script Web App URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTygHaGbvikAfjcpi_uJeGJ2kfSN_iMV2rk4D1xoqAdjWArR53yEJ6IIlAORua2cF4wQ/exec";



    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8', // Use text/plain to avoid CORS preflight while still sending JSON
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
              title="Do you have a project <br/>in your mind?"
              subtitle="Get in Touch"
            />
            <Spacing lg="55" md="30" />
            <ContactInfoWidget withIcon />
            <Spacing lg="0" md="50" />
          </Div>
          <Div className="col-lg-6">
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
      <Div className="cs-google_map">
        <iframe
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.226435949011!2d79.73232414837688!3d11.749092154690135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a54a3002a5f01b5%3A0x6a60aa14581eae8b!2sGopal%20Nagar!5e0!3m2!1sen!2sin!4v1775674860654!5m2!1sen!2sin"
          allowFullScreen
          title="Google Map"
        />
      </Div>
      <Spacing lg="50" md="40" />
    </>
  );
}