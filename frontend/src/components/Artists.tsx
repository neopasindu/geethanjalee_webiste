import { useState } from 'react';
import { ArtistProfile } from '@/types';

interface ArtistsProps {
  artists: ArtistProfile[];
}

export default function Artists({ artists }: ArtistsProps) {
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile | null>(
    null,
  );
  const soloArtists = artists.filter((a) => !a.isBand);
  const band = artists.find((a) => a.isBand);

  return (
    <section
      id="artists"
      className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4A017]/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#F5C842]/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="w relative z-10">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#D4A017] font-semibold mb-3 border border-[#D4A017]/30 bg-[#D4A017]/10 px-4 py-1.5 rounded-full">
            Headline Performers
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight mt-4">
            Featuring the <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C842] to-[#D4A017]">
              Finest Voices
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-prompt leading-relaxed">
            Sri Lanka&apos;s most celebrated artists converge at Geethanjalee
            for a night of unmatched musical brilliance.
          </p>
        </div>

        {/* 1. 4 Solo Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {soloArtists.map((artist, idx) => {
            const isOffset = idx % 2 === 1;
            return (
              <div
                key={artist.id}
                onClick={() => setSelectedArtist(artist)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  isOffset ? 'lg:mt-6' : ''
                }`}
              >
                <div className="rounded-3xl overflow-hidden border border-white/10 group-hover:border-[#D4A017]/60 transition-all duration-300 bg-[#111108] shadow-2xl flex flex-col h-full hover:-translate-y-1">
                  <div className="relative h-80 sm:h-84 overflow-hidden bg-neutral-950">
                    <img
                      src={artist.image}
                      alt={artist.stageName}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111108] via-[#111108]/20 to-transparent" />

                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest bg-black/75 backdrop-blur-md border border-[#D4A017]/40 text-[#F5C842] px-3 py-1 rounded-full shadow-md">
                      {artist.role.split(' ')[0]}
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/55">
                      <span className="text-xs uppercase tracking-wider font-semibold text-black bg-[#D4A017] px-4 py-2 rounded-full shadow-lg shadow-[#D4A017]/40 font-prompt">
                        View Profile
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-display font-bold text-white text-lg group-hover:text-[#D4A017] transition-colors leading-snug">
                        {artist.stageName}
                      </h3>
                      <p className="text-xs text-[#D4A017]/90 mt-1 font-prompt font-medium">
                        {artist.role}
                      </p>

                      <div className="mt-3.5 flex flex-wrap gap-1.5">
                        {artist.hits.slice(0, 2).map((hit) => (
                          <span
                            key={hit}
                            className="text-[10px] font-prompt text-neutral-300 bg-white/5 border border-white/5 px-2.5 py-0.5 rounded-full"
                          >
                            {hit}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400 font-mono tracking-wide">
                        {artist.instagramHandle}
                      </span>
                      <span className="text-xs text-[#D4A017] group-hover:translate-x-1 transition-transform flex items-center gap-1 font-prompt font-semibold">
                        Details <i className="ri-arrow-right-line" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Band Section */}
        {band && (
          <div className="mt-20 sm:mt-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4A017] font-semibold bg-[#D4A017]/10 border border-[#D4A017]/30 px-3.5 py-1 rounded-full">
                Live Symphony &amp; Musical Direction
              </span>
              <div className="h-px bg-gradient-to-r from-[#D4A017]/30 via-white/10 to-transparent flex-1" />
            </div>

            <div
              className="group relative rounded-3xl overflow-hidden border border-[#D4A017]/30 bg-[#111108] shadow-2xl hover:border-[#D4A017]/70 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedArtist(band)}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] overflow-hidden bg-black">
                  <img
                    src={band.image}
                    alt={band.stageName}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111108] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:via-[#111108]/30 lg:to-[#111108]" />

                  <div className="absolute top-5 left-5 flex items-center gap-2 flex-wrap z-10">
                    <span className="text-xs font-bold uppercase tracking-widest bg-[#D4A017] text-black px-3.5 py-1.5 rounded-full shadow-lg shadow-[#D4A017]/40 flex items-center gap-1.5">
                      <i className="ri-flashlight-fill" /> Headline Band
                    </span>
                    <span className="text-xs font-semibold bg-black/80 backdrop-blur-md text-[#F5C842] border border-[#D4A017]/40 px-3 py-1.5 rounded-full">
                      Sarith &amp; Surith
                    </span>
                  </div>

                  {band.bandLogos && band.bandLogos.length >= 2 && (
                    <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-black/75 backdrop-blur-md border border-white/15 p-2 rounded-2xl z-10">
                      <img
                        src={band.bandLogos[0]}
                        alt="The News Band Logo"
                        className="w-12 h-12 object-contain rounded-lg"
                      />
                      <div className="w-px h-8 bg-white/20" />
                      <img
                        src={band.bandLogos[1]}
                        alt="Sarith Surith Logo"
                        className="w-12 h-12 object-contain rounded-lg"
                      />
                      <div className="flex flex-col pr-2">
                        <span className="text-[11px] font-bold text-white leading-tight">
                          The News Band
                        </span>
                        <span className="text-[10px] text-[#D4A017] font-prompt">
                          Official Band
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#111108] relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <i className="ri-music-2-fill text-[#D4A017] text-lg" />
                      <span className="text-xs text-[#D4A017] uppercase tracking-widest font-semibold">
                        Musical Direction &amp; Orchestration
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight">
                      Sarith &amp; Surith
                    </h3>
                    <h4 className="text-lg sm:text-xl font-display font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#F5C842] to-[#D4A017] mt-1">
                      with The News Band
                    </h4>

                    <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-prompt">
                      {band.bio}
                    </p>

                    <div className="mt-6">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4A017] block mb-2">
                        Band Ensemble
                      </span>
                      <div className="space-y-1.5">
                        {band.bandMembers?.map((member, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-neutral-300 font-prompt"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                            <span>{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                        Signatures &amp; Medleys
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {band.hits.map((hit) => (
                          <span
                            key={hit}
                            className="text-[11px] bg-white/5 border border-white/10 text-neutral-200 px-3 py-1 rounded-full font-prompt"
                          >
                            {hit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArtist(band);
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#D4A017] hover:bg-[#F5C842] text-black text-xs uppercase font-semibold tracking-wider transition-all shadow-lg shadow-[#D4A017]/30 hover:scale-105 cursor-pointer flex items-center gap-2"
                      >
                        <i className="ri-profile-line text-sm" />
                        <span>Full Band Story</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-white">
                      <a
                        href={`https://instagram.com/${band.instagramHandle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4A017] hover:border-[#D4A017] hover:text-black transition-colors"
                        aria-label="Instagram"
                      >
                        <i className="ri-instagram-line" />
                      </a>
                      <a
                        href={`https://youtube.com/@${band.youtubeHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4A017] hover:border-[#D4A017] hover:text-black transition-colors"
                        aria-label="YouTube"
                      >
                        <i className="ri-youtube-line" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-[#D4A017]/50 to-transparent" />
      </div>

      {/* ARTIST DETAIL MODAL */}
      {selectedArtist && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl"
          onClick={() => setSelectedArtist(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111108] border border-[#D4A017]/30 shadow-2xl shadow-[#D4A017]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl bg-black">
              <img
                src={selectedArtist.image}
                alt={selectedArtist.stageName}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111108] via-[#111108]/30 to-transparent" />

              <button
                onClick={() => setSelectedArtist(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 hover:bg-[#D4A017] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-white/20 z-20"
                aria-label="Close modal"
              >
                <i className="ri-close-line text-xl" />
              </button>

              {selectedArtist.isBand ? (
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="text-[11px] font-bold uppercase tracking-widest bg-[#D4A017] text-black px-3.5 py-1.5 rounded-full shadow-lg">
                    ⚡ Live Band Ensemble
                  </span>
                  {selectedArtist.bandLogos?.map((logo, i) => (
                    <img
                      key={i}
                      src={logo}
                      alt="Logo"
                      className="w-9 h-9 object-contain bg-black/60 rounded-full border border-white/20 p-1"
                    />
                  ))}
                </div>
              ) : null}

              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-[#D4A017] font-semibold">
                  {selectedArtist.role}
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 leading-tight">
                  {selectedArtist.stageName}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 font-mono flex items-center gap-1.5">
                  <i className="ri-map-pin-line text-[#D4A017]" />
                  {selectedArtist.origin}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-3 text-xs text-neutral-400">
                <i className="ri-id-card-line text-[#D4A017] text-base mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#D4A017] block mb-0.5">
                    Official Entity / Artists
                  </span>
                  <span className="text-neutral-200 font-prompt">
                    {selectedArtist.name}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#D4A017] font-semibold mb-2 flex items-center gap-2">
                  <i className="ri-quill-pen-line" /> Biography &amp; Musical
                  Journey
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-prompt">
                  {selectedArtist.bio}
                </p>
              </div>

              {selectedArtist.isBand && selectedArtist.bandMembers && (
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#D4A017] font-semibold mb-3 flex items-center gap-2">
                    <i className="ri-group-line" /> Performing Ensemble
                  </h4>
                  <div className="space-y-2">
                    {selectedArtist.bandMembers.map((m) => (
                      <div
                        key={m}
                        className="text-xs bg-[#D4A017]/10 border border-[#D4A017]/30 text-[#F5C842] px-3.5 py-2 rounded-xl font-prompt flex items-center gap-2"
                      >
                        <i className="ri-music-fill text-[#D4A017]" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#D4A017] font-semibold mb-3 flex items-center gap-2">
                  <i className="ri-music-fill" /> Signatures &amp; Hit Tracks
                </h4>
                <div className="space-y-2">
                  {selectedArtist.hits.map((hit, idx) => (
                    <div
                      key={hit}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#D4A017]/30 transition-colors"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#D4A017]/15 border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-neutral-200 font-prompt">
                        {hit}
                      </span>
                      <i className="ri-play-circle-line text-[#D4A017] ml-auto text-lg" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#D4A017]/8 border border-[#D4A017]/20 rounded-2xl p-4">
                <h4 className="text-xs uppercase tracking-widest text-[#D4A017] font-semibold mb-2 flex items-center gap-2">
                  <i className="ri-award-fill" /> Achievements &amp; Accolades
                </h4>
                <p className="text-sm text-neutral-300 font-prompt leading-relaxed">
                  {selectedArtist.accolades}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://instagram.com/${selectedArtist.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4A017] hover:border-[#D4A017] hover:text-black text-white text-xs font-medium transition-all cursor-pointer"
                >
                  <i className="ri-instagram-line text-sm" />
                  {selectedArtist.instagramHandle}
                </a>
                <a
                  href={`https://youtube.com/@${selectedArtist.youtubeHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4A017] hover:border-[#D4A017] hover:text-black text-white text-xs font-medium transition-all cursor-pointer"
                >
                  <i className="ri-youtube-line text-sm" />
                  YouTube Channel
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
