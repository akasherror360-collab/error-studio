import React from 'react'
import Div from '../Div'

export default function TextWidget({logoSrc, logoAlt, text}) {
  return (
    <Div className="cs-text_widget">
      <img src={logoSrc} width={120} className='rounded-[100%]' alt={logoAlt} />
      <p>{text}</p>
    </Div>
  )
}
