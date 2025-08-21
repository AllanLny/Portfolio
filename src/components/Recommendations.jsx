import React, { useEffect, useRef, useState } from 'react';
import './Recommendations.scss';
import recommendations from '../data/recommendations.json';

export default function Recommendations() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const recommendationRefs = useRef([]);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Configuration du défilement automatique
  useEffect(() => {
    // Démarrer le timer pour changer automatiquement les recommandations
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
      }
    }, 20000); // 20 secondes

    // Nettoyage à la destruction du composant
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused]);

  // Gestion du style de positionnement des éléments
  useEffect(() => {
    if (recommendationRefs.current && recommendationRefs.current.length > 0) {
      recommendationRefs.current.forEach((item, i) => {
        if (item) {
          item.style.position = 'absolute';
          item.style.width = '100%';
          item.style.transform = `translateX(${(i - index) * 100}%)`;
          item.style.transition = 'transform 600ms cubic-bezier(.22,.9,.31,1)';
          item.style.opacity = i === index ? '1' : '0';
          item.style.pointerEvents = i === index ? 'all' : 'none';
        }
      });
    }
  }, [index]);

  // Fonctions de navigation
  const goToPrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + recommendations.length) % recommendations.length);
    resetTimer();
  };

  const goToNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
    resetTimer();
  };

  const goToSpecific = (i) => {
    setIndex(i);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
      }
    }, 20000);
  };

  return (
    <section 
      className="liquid-glass section-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="recommendations-container" ref={containerRef}>
        {recommendations.map((rec, i) => (
          <blockquote 
            key={i} 
            className={`recommendation-item ${i === index ? 'active' : ''}`}
            ref={el => recommendationRefs.current[i] = el}
          >
            <div className="recommendation-content">
              <p>"{rec.text}"</p>
              <footer>{rec.author}</footer>
            </div>
          </blockquote>
        ))}
      </div>
      
      {/* Contrôles de navigation */}
      <div className="recommendation-controls">
        <button 
          className="control-btn prev" 
          onClick={goToPrevious}
          aria-label="Témoignage précédent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div className="recommendation-dots">
          {recommendations.map((_, i) => (
            <button 
              key={i} 
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => goToSpecific(i)}
              aria-label={`Aller au témoignage ${i + 1}`}
            />
          ))}
        </div>
        
        <button 
          className="control-btn next" 
          onClick={goToNext}
          aria-label="Témoignage suivant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}