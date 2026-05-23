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
import editing_img from '../../assets/images/service_4.jpeg'
import ctaBg from '../../assets/images/cta_bg.jpeg'

export default function PostProductionEditing() {
  pageTitle('Post-Production & Editing');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PageHeading 
        title='Post-Production & Editing'
        bgSrc={serviceHeroBg}
        pageLinkText='Post-Production & Editing'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='The Art of the Final Touch' 
          subtitle='Post-Production & Editing' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_1}
              title='Photo Retouching'
              subtitle='Professional color grading, skin retouching, and background manipulation to make every image perfect.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_2}
              title='Video Editing'
              subtitle='Seamless cuts, transitions, sound design, and color correction that brings your video footage to life.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_3}
              title='Restoration'
              subtitle='Reviving old or damaged photographs using advanced digital restoration techniques to preserve history.'
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
            <h2 className="cs-font_50 cs-m0">Polishing Your Vision</h2>
            <Spacing lg='50' md='30'/>
            <p>Great content is born in the camera but perfected in the edit. Our post-production team uses industry-standard software to refine your visuals. Whether it's high-fashion retouching or cinematic color grading, we ensure the final product exceeds your expectations.</p>
            <Spacing lg='30' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/contact' btnText='Upload Files' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/portfolio' btnText='Editing Samples' variant='cs-type2'/>
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
                title='Editing FAQ' 
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
