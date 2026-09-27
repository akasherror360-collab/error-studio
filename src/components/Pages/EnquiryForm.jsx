import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Div from '../Div';

// Configure only after the owner's endpoint is deployed, an enquiry arrives in his inbox,
// and the browser's response is verified. Do not use the old collaborator-owned endpoint.
const OWNER_ENQUIRY_URL = process.env.REACT_APP_ENQUIRY_URL || '';
const empty = { fullName: '', mobile: '', email: '', projectType: '', eventDate: '', location: '', message: '' };
const services = ['Wedding Photography', 'Cinematic Videography', 'Creative Editing', 'Brand & Commercial', 'Album Design', 'Event Coverage', 'Cinematic Teasers', 'Other'];

export default function EnquiryForm() {
  const [formData, setFormData] = useState(empty);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const change = (event) => setFormData(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    if (!OWNER_ENQUIRY_URL || sending) return;
    setSending(true);
    setStatus(null);
    try {
      const response = await fetch(OWNER_ENQUIRY_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(formData) });
      if (!response.ok) throw new Error('Request failed');
      const result = await response.json();
      if (result.result !== 'success') throw new Error('Delivery failed');
      setFormData(empty);
      setStatus({ ok: true, text: 'Your enquiry has been sent. Thank you.' });
    } catch (error) {
      setStatus({ ok: false, text: 'We could not send your enquiry. Please call us instead.' });
    } finally {
      setSending(false);
    }
  };
  return <form onSubmit={submit} className="row">
    {[
      ['fullName', 'Full Name*', 'text', 'Your name', true],
      ['mobile', 'Mobile Number*', 'tel', 'Your phone number', true],
      ['email', 'Email Address (optional)', 'email', 'you@example.com', false],
      ['projectType', 'Service Type*', 'select', '', true],
      ['eventDate', 'Event / shoot date*', 'date', '', true],
      ['location', 'Shoot location*', 'text', 'City or venue', true]
    ].map(([name, label, type, placeholder, required]) => <Div className="col-sm-6" key={name}>
      <label htmlFor={`enquiry-${name}`} className="cs-primary_color">{label}</label>
      {type === 'select' ? <select id={`enquiry-${name}`} name={name} className="cs-form_field" required={required} value={formData[name]} onChange={change}>
        <option value="">Choose a service</option>{services.map(service => <option key={service} value={service}>{service}</option>)}
      </select> : <input id={`enquiry-${name}`} name={name} type={type} className="cs-form_field" placeholder={placeholder} required={required} value={formData[name]} onChange={change} />}
      <Div className="cs-height_20" />
    </Div>)}
    <Div className="col-sm-12"><label htmlFor="enquiry-message" className="cs-primary_color">Tell us about your shoot*</label>
      <textarea id="enquiry-message" rows="5" name="message" className="cs-form_field" placeholder="Tell us about your plans" required value={formData.message} onChange={change} />
      <Div className="cs-height_25" />
      <button className="cs-btn cs-style1" type="submit" disabled={sending || !OWNER_ENQUIRY_URL}><span>{sending ? 'Sending...' : 'Send Enquiry'}</span><Icon icon="bi:arrow-right" /></button>
      {!OWNER_ENQUIRY_URL && <p role="status" style={{ marginTop: 16 }}>The online form is being updated. Please call us to enquire.</p>}
      {status && <p role={status.ok ? 'status' : 'alert'} style={{ marginTop: 16 }}>{status.text}</p>}
    </Div>
  </form>;
}
