import React from 'react';
import { Link } from 'react-router-dom';
import { pageTitle } from '../../helper';
import Div from '../Div';
import './error-state.css';

export default function ErrorPage() {
  pageTitle('Page not found');
  return <main className="es-not-found cs-error_page">
    <Div className="es-not-found-inner">
      <span className="es-not-found-kicker">ERROR STUDIO / 404</span>
      <h1>We couldn't find<br />this page.</h1>
      <p>The link may have moved, or the address may have a typo. You can start again from the studio homepage.</p>
      <Link to="/" className="es-not-found-link">Back to home <span aria-hidden="true">↗</span></Link>
    </Div>
  </main>;
}
