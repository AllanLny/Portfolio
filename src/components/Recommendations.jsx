import React, { useEffect, useRef, useState } from 'react';
import './Recommendations.scss';

const recommendations = [
  {
    author: "Jean Dupont, CTO @ BigCorp",
    text: "Allan a su automatiser notre CI/CD et améliorer la fiabilité de nos déploiements. Un vrai atout pour l’équipe !"
  },
  {
    author: "Sophie Martin, Lead Dev @ StartupX",
    text: "Toujours force de proposition, Allan a apporté une vraie culture DevOps et FullStack à nos projets."
  }
];

export default function Recommendations() {
  const [index, setIndex] = useState(0);
  const len = recommendations.length;
  const intervalRef = useRef(null);

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
      }, 10000);
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
      <div
        className="recommendations-viewport"
        onTouchStart={(e) => { if (len > 1) e.preventDefault(); }}
        onMouseDown={(e) => { if (len > 1) e.preventDefault(); }}
      >
        <div
          className="recommendations-track"
          // make track width explicit so percent transforms are predictable
          style={{ width: `${len * 100}%`, transform: `translateX(-${index * (100 / (len || 1))}%)` }}
        >
          {recommendations.map((rec, i) => (
            <blockquote key={i} className="recommendation-item" style={{ width: `${100 / (len || 1)}%` }}>
              <p>“{rec.text}”</p>
              <footer>{rec.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
