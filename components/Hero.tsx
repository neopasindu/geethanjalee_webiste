"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/constants";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = SITE_CONFIG.heroSlides;

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section id="home" className="relative h-screen w-full flex justify-center items-center overflow-hidden bg-black select-none">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            }`}
          style={{ transitionProperty: "opacity, transform" }}
        >
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-black/50 to-black/70 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-black/80 z-10" />

          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center pointer-events-none"
          />
        </div>
      ))}

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto mt-12 sm:mt-0">
        <div className="transition-all duration-700 ease-out transform">
          <span className="text-xs sm:text-sm md:text-base font-light tracking-[0.3em] uppercase block mb-2 sm:mb-3 text-[#F5C842] font-prompt drop-shadow-md">
            {slides[currentSlide].tagline}
          </span>

          {slides[currentSlide].title.toLowerCase().includes("geethanjalee") ? (
            <div className="flex justify-center items-center my-1 sm:my-3">
              <img
                src="/assets/geethanjalee2026.png"
                alt="Geethanjalee 2026"
                className="w-full max-w-[340px] sm:max-w-[560px] md:max-w-[760px] lg:max-w-[940px] xl:max-w-[1060px] h-auto object-contain drop-shadow-[0_15px_45px_rgba(212,160,23,0.55)] filter brightness-115 pointer-events-none select-none transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          ) : (
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-display uppercase tracking-tight leading-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              {slides[currentSlide].title}
            </h1>
          )}

          <p className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto font-prompt font-light leading-relaxed drop-shadow">
            {slides[currentSlide].subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="#tickets"
              className="group font-prompt cursor-pointer rounded-full bg-accent hover:bg-accent-hover text-white text-sm sm:text-base px-7 py-3.5 font-medium transition-all duration-300 shadow-xl shadow-accent/30 hover:scale-105 flex items-center gap-2"
            >
              <span>{slides[currentSlide].ctaPrimary}</span>
              <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#artists"
              className="group font-prompt cursor-pointer rounded-full border border-white/30 backdrop-blur-md bg-white/5 hover:bg-white/15 text-sm sm:text-base px-6 py-3.5 font-medium text-white transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <span>{slides[currentSlide].ctaSecondary}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next Arrows (Desktop) */}
      <div className="absolute hidden sm:flex top-1/2 left-4 right-4 md:left-8 md:right-8 justify-between z-30 transform -translate-y-1/2 pointer-events-none">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 backdrop-blur-md bg-black/40 text-white hover:bg-accent hover:border-accent transition-all duration-300 pointer-events-auto hover:scale-110 shadow-lg"
        >
          <i className="ri-arrow-left-s-line text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 backdrop-blur-md bg-black/40 text-white hover:bg-accent hover:border-accent transition-all duration-300 pointer-events-auto hover:scale-110 shadow-lg"
        >
          <i className="ri-arrow-right-s-line text-2xl" />
        </button>
      </div>

      {/* Slide Pagination Dots */}
      <div className="absolute bottom-16 sm:bottom-12 left-0 right-0 z-30 flex justify-center items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${idx === currentSlide
                ? "w-8 bg-accent shadow-[0_0_12px_#D4A017]"
                : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
