import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Div from '../Div';
import './enquiry-states.css';

// Enable only after the owner's endpoint has been deployed and a real inbox receipt verified.
const OWNER_ENQUIRY_URL = process.env.REACT_APP_ENQUIRY_URL || '';
const empty = { fullName: '', mobile: '', email: '', projectType: '', eventDate: '', location: '', message: '' };
const services = ['Wedding Photography', 'Cinematic Videography', 'Creative Editing', 'Brand & Commercial', 'Album Design', 'Event Coverage', 'Cinematic Teasers', 'Other'];
const fields = [
  ['fullName', 'Full Name*', 'text', 'Your name'],
  ['mobile', 'Mobile Number*', 'tel', 'Your phone number'],
  ['email', 'Email Address (optional)', 'email', 'you@example.com'],
  ['projectType', 'Service Type*', 'select', ''],
  ['eventDate', 'Event / shoot date*', 'date', ''],
  ['location', 'Shoot location*', 'text', 'City or venue']
];

export function validateEnquiry(data) {
  const errors = {};
  if (data.fullName.trim().length < 2) errors.fullName = 'Enter your name (at least 2 characters).';
  if (!/^\+?[\d\s().-]{7,20}$/.test(data.mobile.trim()) || data.mobile.replace(/\D/g, '').length < 7) errors.mobile = 'Enter a valid phone number.';
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Enter a valid email address, or leave it blank.';
  if (!services.includes(data.projectType)) errors.projectType = 'Choose a service.';
  if (!data.eventDate) errors.eventDate = 'Choose a date for your shoot.';
  if (!data.location.trim()) errors.location = 'Enter a city or venue.';
  if (!data.message.trim()) errors.message = 'Tell us a little about your shoot.';
  return errors;
}

export default function EnquiryForm() {
  const [formData, setFormData] = useState(empty);
  const [touched, setTouched] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const errors = validateEnquiry(formData);
  const ready = Object.keys(errors).length === 0 && Boolean(OWNER_ENQUIRY_URL) && !sending;
  const change = event => {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
    if (status?.ok === false) setStatus(null);
  };
  const blur = event => setTouched(current => ({ ...current, [event.target.name]: true }));
  const submit = async event => {
    event.preventDefault();
    if (!ready) { setTouched(Object.fromEntries(Object.keys(empty).map(key => [key, true]))); return; }
    setSending(true);
    setStatus(null);
    try {
      const response = await fetch(OWNER_ENQUIRY_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(formData) });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (result.result !== 'success') throw new Error('Delivery failed');
      setFormData(empty);
      setTouched({});
      setStatus({ ok: true });
    } catch (_) {
      setStatus({ ok: false });
    } finally { setSending(false); }
  };
  if (status?.ok) return <div className="es-enquiry-state" role="status" aria-live="polite">
    <span className="es-enquiry-kicker">ENQUIRY SENT</span>
    <h3>Thank you for reaching out.</h3>
    <p>Your enquiry was submitted. We will get back to you using the contact details you provided.</p>
    <button type="button" className="es-enquiry-reset" onClick={() => setStatus(null)}>Send another enquiry <Icon icon="bi:arrow-right" /></button>
  </div>;
  return <form onSubmit={submit} noValidate className="row es-enquiry-form">
    {fields.map(([name, label, type, placeholder]) => {
      const showError = touched[name] && errors[name];
      const fieldProps = { id: `enquiry-${name}`, name, className: `cs-form_field${showError ? ' es-field-invalid' : ''}`, value: formData[name], onChange: change, onBlur: blur, 'aria-invalid': Boolean(showError), 'aria-describedby': showError ? `enquiry-${name}-error` : undefined };
      return <Div className="col-sm-6 es-field" key={name}>
        <label htmlFor={`enquiry-${name}`} className="cs-primary_color">{label}</label>
        {type === 'select' ? <select {...fieldProps}><option value="">Choose a service</option>{services.map(service => <option key={service} value={service}>{service}</option>)}</select>
          : <input {...fieldProps} type={type} placeholder={placeholder} autoComplete={name === 'fullName' ? 'name' : name === 'mobile' ? 'tel' : name === 'email' ? 'email' : undefined} />}
        <span id={`enquiry-${name}-error`} className="es-field-error" aria-live="polite">{showError || '\u00a0'}</span>
      </Div>;
    })}
    <Div className="col-sm-12 es-field"><label htmlFor="enquiry-message" className="cs-primary_color">Tell us about your shoot*</label>
      <textarea id="enquiry-message" rows="5" name="message" className={`cs-form_field${touched.message && errors.message ? ' es-field-invalid' : ''}`} placeholder="Tell us about your plans" value={formData.message} onChange={change} onBlur={blur} aria-invalid={Boolean(touched.message && errors.message)} aria-describedby={touched.message && errors.message ? 'enquiry-message-error' : undefined} />
      <span id="enquiry-message-error" className="es-field-error" aria-live="polite">{(touched.message && errors.message) || '\u00a0'}</span>
      <button className="cs-btn cs-style1" type="submit" disabled={!ready}><span>{sending ? 'Sending...' : 'Send Enquiry'}</span><Icon icon="bi:arrow-right" /></button>
      {!OWNER_ENQUIRY_URL && <div className="es-enquiry-notice" role="status"><span className="es-enquiry-kicker">ONLINE FORM UNAVAILABLE</span><p>The online form is being updated. For now, please call <a href="tel:+919944036606">+91 99440 36606</a> to enquire.</p></div>}
      {status?.ok === false && <div className="es-enquiry-notice es-enquiry-failed" role="alert"><span className="es-enquiry-kicker">NOT SENT</span><p>We couldn't send your enquiry. Your details are still here; try again, or call <a href="tel:+919944036606">+91 99440 36606</a>.</p></div>}
    </Div>
  </form>;
}
