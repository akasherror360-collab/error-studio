import React from 'react'
import { Icon } from '@iconify/react';

export default function ContactInfoWidget({ withIcon, title }) {
  return (
    <>
      {title && <h2 className="cs-widget_title">{title}</h2>}
      <ul className="cs-menu_widget cs-style1 cs-mp0">
        <a href="tel:+916384568059" target='_blank' rel='noopener noreferrer'>
          <li className='mb-3'>
            {withIcon ? <span className='cs-accent_color'><Icon icon="material-symbols:add-call-rounded" /></span> : ''}
            +91 63845 68059
          </li>
        </a>
        <a href="tel:+919965739418" target='_blank' rel='noopener noreferrer'>
          <li className='mb-3'>
            {withIcon ? <span className='cs-accent_color'><Icon icon="material-symbols:add-call-rounded" /></span> : ''}
            +91 99657 39418
          </li>
        </a>
        <a href="mailto:errorstudio2020@gmail.com" className='mb-3' target='_blank' rel='noopener noreferrer'>
          <li>
            {withIcon ? <span className='cs-accent_color mb-3'><Icon icon="mdi:envelope" /></span> : ''}
            errorstudio2020@gmail.com
          </li>
        </a>
        <li>
          {withIcon ? <span className='cs-accent_color'><Icon icon="mdi:map-marker" /></span> : ''}
          1A, Gopal Nagar, Pathirikuppam, <br />Thiruvanthipuram Main Road, <br />Cuddalore – 607401, Tamil Nadu
        </li>
      </ul>
    </>
  )
}
