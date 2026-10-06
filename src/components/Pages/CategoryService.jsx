import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './category-service.css'
import { pageTitle } from '../../helper'
import Button from '../Button'
import Cta from '../Cta'
import PageHeading from '../PageHeading'
import Div from '../Div'
import Spacing from '../Spacing'
import serviceHeroBg from '../../assets/images/service_hero_bg.jpeg'
import ctaBg from '../../assets/images/cta_bg.jpeg'
import { portfolioData } from './PortfolioPage'

const MAPS = 'https://www.google.com/maps/search/?api=1&query=ERROR+STUDIO&query_place_id=ChIJW5keDM-jVDoR8cdDOLM8_UA'
const SITE = 'https://www.errorstudio.in'

export const categoryPages = {
  wedding: {
    seoKey: 'Wedding Photography', path: '/service/wedding-photography', gallery: 'tamil-weddings',
    name: 'Wedding Photography', h1: 'Wedding Photography in Cuddalore, Villupuram and Pondicherry',
    intro: 'Error Studio photographs weddings from the rituals to the quiet moments in between. The photographs below are from our own wedding shoots.',
    galleryTitle: 'From our wedding shoots', cta: 'Check your wedding date',
  },
  'pre-wedding': {
    seoKey: 'Pre-Wedding Photography', path: '/service/pre-wedding-photography', gallery: 'pre-wedding',
    name: 'Pre-Wedding Photography', h1: 'Pre-Wedding Photography in Cuddalore, Villupuram and Pondicherry',
    intro: 'Error Studio photographs couples before the wedding day. The photographs below are from our own pre-wedding shoots.',
    galleryTitle: 'From our pre-wedding shoots', cta: 'Plan your pre-wedding shoot',
  },
  portraits: {
    seoKey: 'Portrait Photography', path: '/service/portrait-photography', gallery: 'portraits',
    name: 'Portrait Photography', h1: 'Portrait Photography in Cuddalore, Villupuram and Pondicherry',
    intro: 'Error Studio photographs portraits of individuals, couples and families. The photographs below are from our own shoots.',
    galleryTitle: 'From our portrait shoots', cta: 'Plan your portrait shoot',
  },
}
const order = ['wedding', 'pre-wedding', 'portraits']

export default function CategoryService({ id }) {
  const c = categoryPages[id]
  pageTitle(c.seoKey)
  useEffect(() => {
    window.scrollTo(0, 0)
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.text = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Service', name: c.name, serviceType: c.name,
      url: SITE + c.path,
      provider: { '@type': 'LocalBusiness', '@id': SITE + '/#business', name: 'ERROR STUDIO' },
      areaServed: [{ '@type': 'City', name: 'Cuddalore' }, { '@type': 'City', name: 'Villupuram' }, { '@type': 'City', name: 'Pondicherry' }],
    })
    document.head.appendChild(el)
    return () => { document.head.removeChild(el) }
  }, [c])
  const photos = portfolioData.filter((p) => p.category === c.gallery)
  const others = order.filter((k) => k !== id)
  return (
    <>
      <PageHeading title={c.name} bgSrc={serviceHeroBg} pageLinkText={c.name} />
      <Spacing lg='120' md='70' />
      <Div className="container es-cat_service">
        <h2>{c.h1}</h2>
        <p className="es-cat_service_intro">{c.intro}</p>
        <p>Error Studio is based in Cuddalore and takes enquiries from Cuddalore, Villupuram and Pondicherry. Message us your date and location to check availability.</p>
        <Spacing lg='30' md='20' />
        <Div className="es-cat_service_actions">
          <Button btnLink='/contact' btnText={c.cta} variant='cs-type2' />
          <a className="es-cat_service_call" href="tel:+919944036606">Call +91 99440 36606</a>
        </Div>
        <Spacing lg='70' md='45' />
        <h3>{c.galleryTitle}</h3>
        <Div className="es-cat_service_grid">
          {photos.slice(0, 9).map((p, i) => (
            <Link key={i} to={`/portfolio?category=${c.gallery}`} aria-label={`${c.name} gallery`}>
              <img src={p.src} alt={`${c.name} by Error Studio, Cuddalore`} loading="lazy" />
            </Link>
          ))}
        </Div>
        <Spacing lg='30' md='20' />
        <Link className="es-cat_service_more" to={`/portfolio?category=${c.gallery}`}>See the full gallery</Link>
        <Spacing lg='70' md='45' />
        <Div className="es-cat_service_info">
          <Div>
            <h3>Studio in Cuddalore</h3>
            <p>Error Studio, Co-operative Nagar, Koothapakkam, Pathirikuppam, Cuddalore, Tamil Nadu 607401</p>
            <p><a href={MAPS} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
          </Div>
          <Div>
            <h3>Areas we serve</h3>
            <p>Cuddalore, Villupuram and Pondicherry.</p>
            <p>Phone: <a href="tel:+919944036606">+91 99440 36606</a></p>
          </Div>
          <Div>
            <h3>Other photography</h3>
            <p>{others.map((k, i) => <span key={k}>{i > 0 && ' | '}<Link to={categoryPages[k].path}>{categoryPages[k].name}</Link></span>)}</p>
            <p><Link to="/service">All services</Link></p>
          </Div>
        </Div>
      </Div>
      <Spacing lg='130' md='70' />
      <Div className="container">
        <Cta title='Let’s plan your <br />shoot <i>together</i>' btnText='Enquire about your shoot' btnLink='/contact' bgSrc={ctaBg} />
      </Div>
    </>
  )
}
