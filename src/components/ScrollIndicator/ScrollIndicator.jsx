import React from 'react';
import './ScrollIndicator.scss';

export default function ScrollIndicator({ href, text }) {
  return (
    <a href={href} className="scroll-down-indicator">
      <span>{text}</span>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </a>
  );
}