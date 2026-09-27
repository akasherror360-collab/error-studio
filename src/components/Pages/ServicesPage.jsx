import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './service-guide.css'
import { pageTitle } from '../../helper'
import Card from '../Card'
import Cta from '../Cta'
import PageHeading from '../PageHeading'
import Div from '../Div'
import SectionHeading from '../SectionHeading'
import TestimonialSlider from '../Slider/TestimonialSlider'
import Spacing from '../Spacing'
import serviceHeroBg from '../../assets/images/service_hero_bg.jpeg'
import service_1 from '../../assets/images/client-2026-09/f07214dc.webp';
import service_2 from '../../assets/images/client-2026-09/c347dc1d.webp';
import service_3 from '../../assets/images/client-2026-09/e283b9f8.webp';
import service_4 from '../../assets/images/client-2026-09/ca4c47af.webp';
import service_5 from '../../assets/images/client-2026-09/7196946d.webp';
import service_6 from '../../assets/images/website/portfolio/12X36/35.webp';
import service_7 from '../../assets/images/client-2026-09/0200bd0e.webp';
import ctaBg from '../../assets/images/cta_bg.jpeg'

export default function ServicesPage() {
  pageTitle('Service');
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <PageHeading 
        title='Services'
        bgSrc={serviceHeroBg}
        pageLinkText='Services'
      />
      <Spacing lg='150' md='80'/>
      <Div className='cs-shape_wrap_4'>
        <Div className="cs-shape_4"></Div>
        <Div className="cs-shape_4"></Div>
        <Div className="container">
          <Div className="row">
            <Div className="col-xl-4">
              <SectionHeading
                title='Services we can help you with' 
                subtitle='What Can We Do'
              />
              <Spacing lg='90' md='45'/>
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
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Album Design"
                    link="/service/album-design"
                    src={service_6}
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6 cs-hidden_mobile"></Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Event Coverage"
                    link="/service/event-coverage"
                    src={service_5}
                    alt="Service"
                  />
                  <Spacing lg="0" md="30" />
                </Div>
                <Div className="col-lg-3 col-sm-6">
                  <Card
                    title="Cinematic Teasers"
                    link="/service/cinematic-teasers"
                    src={service_7}
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

      <Spacing lg='125' md='55'/>
      <section className="container es-service_guide" aria-label="Explore our services">
        <h2>Find the right visual work for your project</h2>
        <p>Explore a service and its examples, then get in touch about your date or brief.</p>
        <div className="es-service_guide_grid">
          {[
            { title: 'Wedding Photography', audience: 'For couples and families planning a wedding.', output: 'Candid and traditional wedding photographs, from the planned portraits to the moments in between.', sample: '/portfolio?category=tamil-weddings', image: service_1 },
            { title: 'Cinematic Videography', audience: 'For weddings, events and other stories that need a film.', output: 'Cinematic films and event highlights with editing and sound.', sample: '/portfolio?category=reels', image: service_2 },
            { title: 'Creative Editing', audience: 'For existing footage that needs a finished story.', output: 'Video editing and colour grading for reels, event highlights and films.', sample: '/portfolio?category=reels', image: service_3 },
            { title: 'Brand & Commercial', audience: 'For businesses showing products or telling a brand story.', output: 'Brand photographs, product visuals and promotional video.', sample: '/portfolio', image: service_4 },
            { title: 'Album Design', audience: 'For couples and families putting their memories in print.', output: 'Photo selection, page layouts and a finished album design.', sample: '/portfolio?category=tamil-weddings', image: service_6 },
            { title: 'Event Coverage', audience: 'For family celebrations and business events.', output: 'Photographs and video coverage of the people, atmosphere and key moments.', sample: '/portfolio?category=all-photos', image: service_5 },
            { title: 'Cinematic Teasers', audience: 'For weddings, events or brands that need a short film.', output: 'Short-form edits and highlight reels.', sample: '/portfolio?category=reels', image: service_7 },
          ].map(item => <article className="es-service_guide_card" key={item.title}>
            <img src={item.image} alt={`${item.title} work by Error Studio`} loading="lazy" />
            <div><h3>{item.title}</h3><p>{item.audience}</p><p>{item.output}</p>
            <nav aria-label={`${item.title} next steps`}><Link to={item.sample}>See related work</Link><Link to="/contact">Check availability</Link></nav></div>
          </article>)}
        </div>
      </section>
      <Spacing lg="125" md="55"/>
      <TestimonialSlider/>
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
