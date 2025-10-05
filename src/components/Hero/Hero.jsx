import React from 'react';
import Avatar from '../Avatar/Avatar';
import SocialLinks from '../SocialLinks/SocialLinks';
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator';
import Recommendations from '../Recommendations/Recommendations';
import './Hero.scss';

export default function Hero() {
  return (
    <section className="minimal-hero" aria-label="Présentation Allan Lannoy Freelance DevOps & FullStack">
      <div className="hero-content liquid-glass">
        <div className="liquid-glass-specular"></div>
        <div className="hero-avatar">
          <Avatar />
        </div>
        <div className="hero-info">
        <div className="hero-text">
          <h1>Allan Lannoy</h1>
          <h2 className="typewriter">
            <span>Ingénieur DevOps & FullStack</span>
          </h2>
          <p className="hero-description">
            Solutions cloud modernes • Architecture • Automatisation
          </p>
          <SocialLinks />
        </div>
        </div>
      </div>

      <section className='section-recommendations' aria-label="Recommandations et témoignages">
        <Recommendations />
      </section>

      <ScrollIndicator href="#projects" text="Voir mes projets" />
    </section>
  );
}