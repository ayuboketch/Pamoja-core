// src/components/HeroSection.jsx

import React, { useState, useEffect } from 'react';

// 1. Import your images
import PamojaDesktop1 from '../assets/pamoja_desktop1.png';
import PamojaDesktop2 from '../assets/pamoja_desktop2.png';
// import PamojaDesktop3 from '../assets/pamoja_desktop3.png';
// import PamojaDesktop4 from '../assets/pamoja_desktop4.png';

const slides = [
  {
    heading: 'Grow Together',
    description:
      'Learn new skills and advance your career through shared knowledge and mentorship.',
    // 2. Reference the imported asset here
    image: PamojaDesktop1,
    ctaPrimary: { title: 'Get Started', href: '/join' },
    ctaSecondary: { title: 'Learn How', href: '/about' },
  },
  {
    heading: 'Network Globally',
    description:
      'Connect with developers, recruiters, and tech leaders from around the world.',
    image: PamojaDesktop2,
    ctaPrimary: { title: 'Join Network', href: '/network' },
    ctaSecondary: { title: 'See Events', href: '/events' },
  },
  {
    heading: 'Discover Opportunities',
    description:
      'Find the latest job openings and freelance gigs tailored to your skillset.',
    image: PamojaDesktop3,
    ctaPrimary: { title: 'Browse Jobs', href: '/jobs' },
    ctaSecondary: { title: 'Post a Role', href: '/post-job' },
  },
  {
    heading: 'Share Resources',
    description:
      'Upload tutorials, code snippets, and best practices to help others learn.',
    image: PamojaDesktop4,
    ctaPrimary: { title: 'Upload Resource', href: '/resources/upload' },
    ctaSecondary: { title: 'View Library', href: '/resources' },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { heading, description, image, ctaPrimary, ctaSecondary } = slides[current];

  return (
    <section id="hero" className="relative overflow-hidden bg-white dark:bg-gray-900">
      <div className="relative h-[500px]">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`
              absolute inset-0 transition-opacity duration-1000
              ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 opacity-50" />
            <div className="relative container mx-auto px-6 lg:px-8 h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between">
              <div className="text-center lg:text-left max-w-lg z-20">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  {slide.heading}
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">
                  {slide.description}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href={ctaPrimary.href}
                    className="px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
                  >
                    {ctaPrimary.title}
                  </a>
                  <a
                    href={ctaSecondary.href}
                    className="px-6 py-3 border border-green-600 text-green-600 rounded-md font-medium hover:bg-green-50 dark:hover:bg-green-900 transition"
                  >
                    {ctaSecondary.title}
                  </a>
                </div>
              </div>
              <div className="relative mt-10 lg:mt-0 flex justify-center lg:justify-end z-30">
                <div className="shadow-2xl rounded-lg overflow-hidden transform lg:-translate-y-10 lg:translate-x-10">
                  {/* 3. Use the variable here */}
                  <img
                    src={image}
                    alt={slide.heading}
                    className="w-full max-w-md"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? 'bg-green-600' : 'bg-gray-400 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
