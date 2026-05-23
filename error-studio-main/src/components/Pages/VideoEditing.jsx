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
import editing_img from '../../assets/images/website/Instagram Posters/00-(4).webp'
import ctaBg from '../../assets/images/cta_bg.jpeg'

export default function VideoEditing() {
  pageTitle('Creative Editing');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PageHeading 
        title='Creative Editing'
        bgSrc={serviceHeroBg}
        pageLinkText='Creative Editing'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Masterful post-production services' 
          subtitle='Creative Editing' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_1}
              title='Expert Editing'
              subtitle='Seamless cuts, advanced transitions, and pacing that perfectly aligns with your vision and goals.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_2}
              title='Color Grading'
              subtitle='Professional color correction and grading to give your visuals a cinematic, high-end commercial look.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_3}
              title='VFX & Motion'
              subtitle='Adding that extra layer of magic with subtle visual effects, motion graphics, and professional sound design.'
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
              <img src={editing_img} alt="Service" className='cs-radius_15 w-100' />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">Polishing the Final Frame</h2>
            <Spacing lg='50' md='30'/>
            <p>Our creative editing services transform raw footage into compelling stories. Whether it’s a high-energy social media reel, a corporate documentary, or a cinematic wedding highlight, we ensure every detail is refined to perfection during the post-production process.</p>
            <Spacing lg='30' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/contact' btnText='Start a Project' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/portfolio' btnText='Editing Portfolio' variant='cs-type2'/>
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
                title='Frequently Asked Questions' 
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
