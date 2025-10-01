import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.scss';

export default function Contact() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const timeoutRef = useRef(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = fields.name.trim();
    const email = fields.email.trim();
    const msg = fields.message.trim();
    if (!name || !email || !msg) {
      setError("Veuillez remplir tous les champs.");
      setMessage("");
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setError(""), 3000);
      return;
    }
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: msg,
        },
        PUBLIC_KEY
      );
      setMessage("Message envoyé !");
      setError("");
      setFields({ name: '', email: '', message: '' });
      form.reset();
    } catch (err) {
      setError("Erreur lors de l'envoi. Merci de réessayer.");
      setMessage("");
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMessage("");
      setError("");
    }, 3000);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <section className="contact-section" aria-label="Formulaire et moyens de contact">
        <div className="liquid-glass contact-container">
          <div className="liquid-glass-specular"></div>
          <h1 className="about-title">Contact</h1>
          <p className="about-intro">
            Vous souhaitez discuter d'un projet ou en savoir plus sur mes services ? N'hésitez pas à me contacter via le formulaire ou les liens ci-dessous.
          </p>
          <div className="about-content">
            <form 
              className="contact-form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={fields.name}
                onChange={handleFieldChange}
                className={fields.name ? 'filled' : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={fields.email}
                onChange={handleFieldChange}
                className={fields.email ? 'filled' : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                value={fields.message}
                onChange={handleFieldChange}
                className={fields.message ? 'filled' : ''}
              />
            </div>
            <button
              className="btn-glass"
              type="submit"
              disabled={!fields.name.trim() || !fields.email.trim() || !fields.message.trim()}
            >
              Envoyer
            </button>
            <div className="form-message-container">
              <span
                className={`form-message${error ? ' error' : ''}${message ? ' success' : ''}`}
                aria-live="polite"
              >
                {error || message || ''}
              </span>
            </div>
          </form>
          <div className="contact-methods" aria-label="Autres moyens de contact">
            <h3>Autres moyens de contact</h3>
            <div className="contact-links">
              <a href="mailto:allancontactdevpro@gmail.com" className="contact-link">allancontactdevpro@gmail.com</a>
              <a href="https://www.linkedin.com/in/allanlannoy/" target="_blank" rel="noopener noreferrer" className="contact-link">linkedin.com/in/allanlannoy</a>
              <a href="https://github.com/AllanLny" target="_blank" rel="noopener noreferrer" className="contact-link">github.com/AllanLny</a>
            </div>
            <div className="response-note">
              Je vous répondrai dans les plus brefs délais.
            </div>
          </div>
        </div>
      </div>
      </section>
  );
}
