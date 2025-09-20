import React, { useRef, useState, useEffect } from 'react';
import Avatar from '../Avatar/Avatar';
import SocialLinks from '../SocialLinks/SocialLinks';
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator';
import Recommendations from '../Recommendations/Recommendations';
import './Hero.scss';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className={`minimal-hero ${isVisible ? 'visible' : ''}`}>
      <div className="hero-content">
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

      <section className='section-recommendations'>
        <Recommendations />
      </section>

      <ScrollIndicator href="#projects" text="Voir mes projets" />
    </section>
  );
}