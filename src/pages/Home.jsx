import React from 'react';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Project/Projects';
import './Home.scss';

export default function Home() {
  return (
    <main className="home-container">
      <Hero />
      <section id="projects" className="projects-showcase">
        <Projects />
      </section>
    </main>
  );
}