import React, { useEffect, useRef, useState } from 'react';
import './Recommendations.scss';
import recommendations from '../data/recommendations.json';

export default function Recommendations() {
  const [index, setIndex] = useState(0);
  const len = recommendations.length;
  const intervalRef = useRef(null);
  const [activeHeight, setActiveHeight] = useState(0);
  const recommendationRefs = useRef([]);

  // Ajuster la hauteur de la section en fonction du contenu actuel
  useEffect(() => {
    if (recommendationRefs.current[index] && recommendationRefs.current[index].scrollHeight) {
      const newHeight = recommendationRefs.current[index].scrollHeight;
      setActiveHeight(newHeight);
      
      // Applique la hauteur via une propriété CSS personnalisée
      document.documentElement.style.setProperty('--recommendation-active-height', `${newHeight}px`);
    }
  }, [index]);

  useEffect(() => {
    // autoplay only if more than one recommendation
    if (len <= 1) return;
    // Respect prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let mounted = true;

    const scheduleNext = () => {
      if (!mounted) return;
      // if page is hidden, don't schedule until visible
      if (typeof document !== 'undefined' && document.hidden) return;
      // clear any previous timeout
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      intervalRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % len);
        // schedule subsequent tick
        scheduleNext();
      }, 15000); // Augmenté à 15 secondes pour les textes plus longs
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) { clearTimeout(intervalRef.current); intervalRef.current = null; }
      } else {
        // resume
        scheduleNext();
      }
    };

    // start
    scheduleNext();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      mounted = false;
      if (intervalRef.current) { clearTimeout(intervalRef.current); intervalRef.current = null; }
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [len]);

  return (
    <section className="liquid-glass recommendations-section">
      <div className="recommendations-container">
        <div
          className={`recommendations-track position-${index}`}
          data-items={len}
        >
          {recommendations.map((rec, i) => (
            <blockquote 
              key={i} 
              className={`recommendation-item ${i === index ? 'active' : ''}`}
              ref={el => recommendationRefs.current[i] = el}
            >
              <p>"{rec.text}"</p>
              <footer>{rec.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
      
      {/* Indicateurs de pagination */}
      {len > 1 && (
        <div className="recommendation-dots">
          {Array.from({ length: len }).map((_, i) => (
            <span 
              key={i} 
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              role="button"
              aria-label={`Témoignage ${i + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </section>
  );
}