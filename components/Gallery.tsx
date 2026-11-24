"use client";

import React, { useState } from "react";
import { GALLERY_ITEMS } from "@/constants";
import { GalleryItem } from "@/types";

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (item: GalleryItem, index: number) => {
    setSelectedPhoto(item);
    setCurrentIndex(index);
  };

  const nextPhoto = () => {
    const nextIdx = (currentIndex + 1) % GALLERY_ITEMS.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(GALLERY_ITEMS[nextIdx]);
  };

  const prevPhoto = () => {
    const prevIdx = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setCurrentIndex(prevIdx);
    setSelectedPhoto(GALLERY_ITEMS[prevIdx]);
  };

  return (
    <section id="gallery" className="bg-[#0a0a0b] py-16 sm:py-24 border-t border-white/10">
      <div className="w mb-12 sm:mb-16 text-center md:text-left">
        <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-2">
          Visual Memories
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
          Concert Moments & Gallery
        </h2>
        <p className="mt-2 text-sm text-neutral-400 font-prompt">
          Snapshots from live rehearsals, onstage solos, and thunderous standing ovations.
        </p>
      </div>

      {/* Bento Grid (Matching Kataka's structure) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[240px] sm:auto-rows-[270px] grid-flow-dense gap-2 sm:gap-3 px-2 sm:px-4">
        {GALLERY_ITEMS.map((item, idx) => {
          const isLarge = item.colSpan === 2;

          return (
            <div
              key={item.id}
              onClick={() => openLightbox(item, idx)}
              className={`relative overflow-hidden group cursor-pointer rounded-2xl bg-neutral-900 border border-white/10 ${
                isLarge ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none select-none"
              />

              {/* Hover Dark Overlay & "Click to preview" Pill */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                <span className="text-white font-medium font-prompt text-xs tracking-wider border border-white/50 px-5 py-2.5 rounded-full backdrop-blur-md bg-black/30 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  Click to preview
                </span>
                <span className="text-xs font-semibold text-white mt-3 drop-shadow">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <i className="ri-close-line text-2xl" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous Photo"
          >
            <i className="ri-arrow-left-s-line text-2xl" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-accent text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next Photo"
          >
            <i className="ri-arrow-right-s-line text-2xl" />
          </button>

          {/* Image & Caption */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/15"
            />
            <div className="text-center mt-4 text-white">
              <h4 className="text-lg font-semibold font-display">{selectedPhoto.title}</h4>
              <p className="text-xs text-neutral-400 mt-1 font-prompt">{selectedPhoto.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
