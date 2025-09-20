import React from 'react';
import './Avatar.scss';

export default function Avatar() {
  return (
    <div className="hero-avatar-container">
      <picture>
        <source srcSet="/img/avatar.webp" type="image/webp" />
        <img 
          className="hero-avatar" 
          src="/img/avatar.png"
          alt="Allan Lannoy" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/img/avatar-placeholder.svg';
          }}
        />
      </picture>
    </div>
  );
}