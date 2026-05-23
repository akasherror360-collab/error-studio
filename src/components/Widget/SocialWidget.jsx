import React from 'react'
import { Icon } from '@iconify/react';
import Div from '../Div';

export default function SocialWidget() {
  return (
    <Div className="cs-social_btns cs-style1">
      <a href='https://www.facebook.com/share/1BQxvdJGY8/?mibextid=wwXIfr' target='_blank' rel='noopener noreferrer' className="cs-center">
        <Icon icon="fa6-brands:facebook" />
      </a>
      <a href='https://www.instagram.com/errorstudio.official?igsh=MXExdHRrMDcweXlrNA%3D%3D&utm_source=qr' target='_blank' rel='noopener noreferrer' className="cs-center">
        <Icon icon="fa6-brands:instagram" />               
      </a>
      <a href='https://youtube.com/@errorstuido?si=69wiTCukQpkVg9dG' target='_blank' rel='noopener noreferrer' className="cs-center">
        <Icon icon="fa6-brands:youtube" />              
      </a>
      <a href='https://x.com/ErrorStudio_Off' target='_blank' rel='noopener noreferrer' className="cs-center">
        <Icon icon="fa6-brands:x-twitter" />              
      </a>
  
    </Div>
  )
}
