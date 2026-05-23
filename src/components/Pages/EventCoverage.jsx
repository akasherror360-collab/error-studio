import React, { useEffect } from 'react'
import { pageTitle } from '../../helper'
import Accordion from '../Accordion'
import Button from '../Button'
import Cta from '../Cta'
import IconBox from '../IconBox'
import PageHeading from '../PageHeading'
import Div from '../Div'
import SectionHeading from '../SectionHeading'
import TestimonialSlider from '../Slider/TestimonialSlider'
import Spacing from '../Spacing'
import serviceHeroBg from '../../assets/images/service_hero_bg.jpeg'
import service_icon_1 from '../../assets/images/icons/service_icon_1.svg'
import service_icon_2 from '../../assets/images/icons/service_icon_2.svg'
import service_icon_3 from '../../assets/images/icons/service_icon_3.svg'
import event_img from '../../assets/images/service_2.jpeg'
import ctaBg from '../../assets/images/cta_bg.jpeg'

export default function EventCoverage() {
  pageTitle('Event Coverage');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PageHeading 
        title='Event Coverage'
        bgSrc={serviceHeroBg}
        pageLinkText='Event Coverage'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Comprehensive Event Capture' 
          subtitle='Event Coverage' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_1}
              title='Corporate Events'
              subtitle='Professional coverage for conferences, summits, and seminars, delivering high-quality images for branding and PR.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_2}
              title='Social Gatherings'
              subtitle='From birthday parties to family reunions, we document your celebrations with energy and style.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_3}
              title='Live Performances'
              subtitle='Concerts, theatrical performances, and stage shows captured with dynamic angles and professional precision.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
        </Div>
      </Div>
      <Spacing lg='120' md='50'/>
      <Div className="container">
        <Div className="row align-items-center">
          <Div className="col-xl-5 col-lg-6">
            <Div className="cs-radius_15 cs-shine_hover_1">
              <img src={event_img} alt="Service" className='cs-radius_15 w-100' />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">Professional Event Solutions</h2>
            <Spacing lg='50' md='30'/>
            <p>Our team provides seamless coverage for events of all scales. We focus on the key moments, the atmosphere, and the details that make each event unique. With fast turnaround times, we ensure you have your content when you need it.</p>
            <Spacing lg='30' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/contact' btnText='Book For Event' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/portfolio' btnText='Event Portfolio' variant='cs-type2'/>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <TestimonialSlider />
      <Spacing lg='145' md='80'/>
      <Div className="container cs-shape_wrap_4">
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-5 col-lg-6">
              <SectionHeading
                title='Event FAQ' 
                subtitle='FAQ'
              />
              <Spacing lg='90' md='45'/>
            </Div>
            <Div className="col-lg-6 offset-xl-1">
              <Accordion/>
            </Div>
          </Div>
        </Div>
      </Div>
      <Spacing lg='150' md='80'/>
      <Div className="container">
        <Cta 
          title='Let’s discuss making <br />something <i>cool</i> together' 
          btnText='Apply For Meeting' 
          btnLink='/contact' 
          bgSrc={ctaBg}
        />
      </Div>
    </>
  )
}
