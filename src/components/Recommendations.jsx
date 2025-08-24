import React, { useEffect, useRef, useState } from 'react';
import './Recommendations.scss';
import recommendations from '../data/recommendations.json';

export default function Recommendations() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [slideDirection, setSlideDirection] = useState('fade-in');

  const recommendationRefs = useRef([]);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const textScrollRef = useRef(null);


  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isPaused && !isDragging) {
        setSlideDirection('slide-from-right');
        setIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
      }
    }, 15000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, isDragging]);

  useEffect(() => {
    if (recommendationRefs.current && recommendationRefs.current.length > 0) {
      recommendationRefs.current.forEach((item, i) => {
        if (item) {
          item.style.position = 'absolute';
          item.style.width = '100%';
          item.style.transform = `translateX(${(i - index) * 100}%)`;
          item.style.transition = isDragging ? 'none' : 'transform 600ms cubic-bezier(.22,.9,.31,1)';
          item.style.opacity = i === index ? '1' : '0';
          item.style.pointerEvents = i === index ? 'all' : 'none';
        }
      });
    }
  }, [index, isDragging]);

  const handleMouseDown = (e) => {
    if (
      textScrollRef.current && 
      e.target.closest('p') === textScrollRef.current && 
      (textScrollRef.current.scrollWidth > textScrollRef.current.clientWidth || 
       textScrollRef.current.scrollHeight > textScrollRef.current.clientHeight)
    ) {
      return;
    }
    
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(0);
    e.preventDefault();
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - containerRef.current.offsetLeft;
    const dragDistance = (x - startX);
    setScrollLeft(dragDistance);
    
    if (recommendationRefs.current && recommendationRefs.current.length > 0) {
      recommendationRefs.current.forEach((item, i) => {
        if (item) {
          const offsetPercent = ((i - index) * 100) + (dragDistance / containerRef.current.offsetWidth * 100);
          item.style.transform = `translateX(${offsetPercent}%)`;
        }
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const dragDistance = (x - startX);
    setScrollLeft(dragDistance);
    
    if (recommendationRefs.current && recommendationRefs.current.length > 0) {
      recommendationRefs.current.forEach((item, i) => {
        if (item) {
          const offsetPercent = ((i - index) * 100) + (dragDistance / containerRef.current.offsetWidth * 100);
          item.style.transform = `translateX(${offsetPercent}%)`;
        }
      });
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = containerRef.current.offsetWidth * 0.2; 
    
    if (scrollLeft > threshold) {
      setSlideDirection('slide-from-left');
      setIndex(prev => (prev - 1 + recommendations.length) % recommendations.length);
    } else if (scrollLeft < -threshold) {
      setSlideDirection('slide-from-right');
      setIndex(prev => (prev + 1) % recommendations.length);
    }
    
    resetTimer();
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const handleWheel = (e) => {
    if (
      textScrollRef.current && 
      (textScrollRef.current.scrollHeight > textScrollRef.current.clientHeight)
    ) {
      const rect = textScrollRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        return;
      }
    }
  };

  const goToSpecific = (i) => {
    if (i > index) {
      setSlideDirection('slide-from-right');
    } else if (i < index) {
      setSlideDirection('slide-from-left');
    } else {
      setSlideDirection('fade-in');
    }
    
    setIndex(i);
    resetTimer();
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (!isPaused && !isDragging) {
        setSlideDirection('slide-from-right');
        setIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
      }
    }, 15000);
  };

  return (
    <section 
      className="liquid-glass section-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="recommendations-container" 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {recommendations.map((rec, i) => (
          <blockquote 
            key={i} 
            className={`recommendation-item ${i === index ? 'active ' + slideDirection : ''}`}
            ref={el => recommendationRefs.current[i] = el}
          >
            <div className="recommendation-content">
              <p ref={i === index ? textScrollRef : null}>"{rec.text}"</p>
              <footer>{rec.author}</footer>
            </div>
          </blockquote>
        ))}
      </div>
      
      <div className="recommendation-controls">
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
      </div>
    </section>
  );
}