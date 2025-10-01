import React from 'react';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Project/Projects';
import './Home.scss';

export default function Home() {
  return (
    <main className="home-container" id="main-content" aria-label="Accueil - Allan Lannoy Freelance DevOps & FullStack">
      <Hero />
      <section id="projects" className="projects-showcase">
        <Projects />
      </section>
    </main>
  );
}