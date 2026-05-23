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
import album_img from '../../assets/images/service_6.jpeg'
import ctaBg from '../../assets/images/cta_bg.jpeg'

export default function AlbumDesign() {
  pageTitle('Album Design');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PageHeading 
        title='Album Design'
        bgSrc={serviceHeroBg}
        pageLinkText='Album Design'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Preserving Memories in Print' 
          subtitle='Album Design' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_1}
              title='Custom Layouts'
              subtitle='Every page is uniquely designed to tell a coherent story, avoiding generic templates and patterns.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_2}
              title='High-End Materials'
              subtitle='We source the finest papers and cover materials (leather, linen, acrylic) for a premium sensory experience.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_3}
              title='Digital Proofing'
              subtitle='Review your album layout online and request changes before it goes to the master printer.'
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
              <img src={album_img} alt="Service" className='cs-radius_15 w-100' />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">A Tangible Legacy</h2>
            <Spacing lg='50' md='30'/>
            <p>In a digital world, a physical album remains the most precious way to relive your memories. Our designers treat every album as a piece of art. We combine elegant typography with thoughtful spacing to create a timeless heirloom that your family will treasure forever.</p>
            <Spacing lg='30' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/contact' btnText='Start Your Album' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/portfolio' btnText='Design Showcase' variant='cs-type2'/>
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
                title='Album FAQ' 
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
