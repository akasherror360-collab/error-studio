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
import wedding_img from '../../assets/images/website/Instagram Posters/5-(1).webp';
import ctaBg from '../../assets/images/cta_bg.jpeg'

export default function WeddingPhotography() {
  pageTitle('Wedding Photography');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PageHeading 
        title='Wedding Photography'
        bgSrc={serviceHeroBg}
        pageLinkText='Wedding Photography'
      />
      <Spacing lg='145' md='80'/>
      <Div className="container">
        <SectionHeading 
          title='Capturing your eternal moments' 
          subtitle='Wedding Photography' 
          variant='cs-style1 text-center'
        />
        <Spacing lg='90' md='45'/>
        <Div className="row">
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_1}
              title='Pre-Wedding'
              subtitle='We capture the beautiful moments before your big day, telling your unique love story through stunning visual narratives.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_2}
              title='Candid Moments'
              subtitle='Our photographers are experts at capturing those spontaneous, emotional moments that make your wedding day truly special.'
            />
            <Spacing lg='30' md='30'/>
          </Div>
          <Div className="col-lg-4">
            <IconBox
              icon={service_icon_3}
              title='Traditional'
              subtitle='Classic shots that family members treasure for generations, captured with high-end equipment and professional lighting.'
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
              <img src={wedding_img} alt="Service" className='cs-radius_15 w-100' />
            </Div>
            <Spacing lg='0' md='40'/>
          </Div>
          <Div className="col-lg-6 offset-xl-1">
            <h2 className="cs-font_50 cs-m0">Bespoke Wedding Collections</h2>
            <Spacing lg='50' md='30'/>
            <p>Every wedding is a unique story waiting to be told. We provide comprehensive coverage that includes multiple photographers, cinematic lighting, and professional post-processing to ensure your memories are preserved beautifully.</p>
            <Spacing lg='30' md='30'/>
            <Div className="row">
              <Div className="col-lg-6">
                <Button btnLink='/contact' btnText='Check Availability' variant='cs-type2'/>
                <Spacing lg='20' md='10'/>
                <Button btnLink='/portfolio' btnText='View Wedding Gallery' variant='cs-type2'/>
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
                title='Common Questions' 
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
