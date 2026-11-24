import React, { useState } from 'react';
import { concertApi } from '@/services/api';
import { ReservationResponse, TicketPass } from '@/types';

interface TicketsSectionProps {
  passes: TicketPass[];
}

export default function TicketsSection({ passes }: TicketsSectionProps) {
  const [selectedPass, setSelectedPass] = useState<TicketPass | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reservationResult, setReservationResult] =
    useState<ReservationResponse | null>(null);
  const [showSeatingModal, setShowSeatingModal] = useState(false);

  const handleOpenBooking = (pass: TicketPass) => {
    setSelectedPass(pass);
    setTicketQuantity(1);
    setFullName('');
    setPhone('');
    setEmail('');
    setErrorMessage(null);
    setReservationResult(null);
  };

  const handleCloseModal = () => {
    setSelectedPass(null);
    setReservationResult(null);
    setErrorMessage(null);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPass || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await concertApi.createReservation({
        passId: selectedPass.id,
        quantity: ticketQuantity,
        fullName,
        phone,
        email,
      });
      setReservationResult(response);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to submit reservation. Please ensure the backend server is running.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="tickets"
      className="py-20 sm:py-28 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#D4A017]/8 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#06B6D4]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20 pb-8 border-b border-white/10">
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#D4A017] font-semibold mb-3 border border-[#D4A017]/30 bg-[#D4A017]/10 px-4 py-1.5 rounded-full">
              Official Passes &amp; Reservations
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight">
              Concert Passes &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C842] to-[#D4A017]">
                Seating
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-neutral-400 font-prompt max-w-xl leading-relaxed">
              University of Peradeniya Gymnasium &bull; December 08, 2026 &bull;
              7:00 PM Onwards
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setShowSeatingModal(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/5 border border-[#D4A017]/40 hover:border-[#D4A017] hover:bg-[#D4A017]/10 text-white hover:text-[#F5C842] transition-all shadow-lg shadow-black/50 cursor-pointer font-prompt text-sm"
            >
              <i className="ri-layout-masonry-line text-[#D4A017] text-lg" />
              <span>View Seating Arrangement</span>
            </button>
          </div>
        </div>

        {/* Seating Layout Banner Card */}
        <div
          onClick={() => setShowSeatingModal(true)}
          className="group mb-16 rounded-3xl overflow-hidden border border-[#D4A017]/30 bg-gradient-to-r from-[#111108] via-neutral-950 to-[#111108] p-6 sm:p-8 cursor-pointer shadow-2xl hover:border-[#D4A017]/70 transition-all duration-500"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-widest font-bold bg-[#D4A017] text-black px-3 py-1 rounded-full shadow-md">
                  Gymnasium Amphitheatre
                </span>
                <span className="text-xs text-neutral-400 font-prompt">
                  Presented by Science Students&apos; Union
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                Explore the Deck Seating Arrangement
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 font-prompt leading-relaxed">
                Choose your view for Geethanjalee 2026. Premium Admiral and
                Captain passes include complimentary refreshments. Click to
                inspect the interactive seating arrangement diagram.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#06B6D4]/15 border border-[#06B6D4]/40 text-[#06B6D4]">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                  5000 LKR &bull; Admiral (Front)
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#A855F7]/15 border border-[#A855F7]/40 text-[#A855F7]">
                  <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
                  3000 LKR &bull; Captain (Mid)
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#F97316]/15 border border-[#F97316]/40 text-[#F97316]">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                  2000 LKR &bull; Commander (Wings)
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/40 text-[#EF4444]">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                  1000 LKR &bull; Lieutenant (Rear)
                </span>
              </div>
            </div>

            <div className="relative shrink-0 w-full sm:w-80 h-44 sm:h-48 rounded-2xl overflow-hidden border border-white/15 group-hover:scale-105 transition-transform duration-500 shadow-xl bg-black">
              <img
                src="/assets/tickets/seating_arrangement.jpg"
                alt="Seating Arrangement Preview"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-wider font-semibold bg-[#D4A017] text-black px-4 py-2 rounded-full shadow-lg font-prompt">
                  Click to Zoom Map
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Ticket Passes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {passes.map((pass) => {
            const hasRefreshments = pass.refreshments;
            const isCyan = pass.colorScheme === 'cyan';
            const isPurple = pass.colorScheme === 'purple';
            const isOrange = pass.colorScheme === 'orange';

            return (
              <div
                key={pass.id}
                className="group flex flex-col justify-between bg-[#111108] border border-white/10 rounded-3xl overflow-hidden hover:border-[#D4A017]/70 transition-all duration-300 shadow-2xl hover:-translate-y-1.5"
              >
                <div className="relative aspect-[520/800] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={pass.image}
                    alt={pass.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111108] via-transparent to-transparent opacity-80" />

                  {hasRefreshments && (
                    <div className="absolute top-3 left-3 right-3 flex justify-center z-10">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4A017] to-[#F5C842] text-black px-3 py-1 rounded-full shadow-lg shadow-[#D4A017]/30">
                        <i className="ri-cup-line" /> Refreshments Included
                      </span>
                    </div>
                  )}

                  <span className="absolute bottom-3 left-3 text-[10px] uppercase font-mono tracking-wider bg-black/80 text-white px-3 py-1 rounded-md backdrop-blur-md border border-white/15">
                    {pass.badge}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-white/10">
                      <div>
                        <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5C842] transition-colors">
                          {pass.title}
                        </h3>
                        <p className="text-xs text-neutral-400 font-prompt mt-0.5">
                          {pass.seatingZone}
                        </p>
                      </div>
                      <span className="font-display font-bold text-xl text-[#F5C842] shrink-0">
                        {pass.price}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {pass.perks.map((perk, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-neutral-300 font-prompt leading-tight"
                        >
                          <span className="text-sm mt-[-2px]">
                            {perk.slice(0, 2)}
                          </span>
                          <span
                            className={
                              perk.includes('Refreshments')
                                ? 'text-[#F5C842] font-semibold'
                                : 'text-neutral-300'
                            }
                          >
                            {perk.slice(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleOpenBooking(pass)}
                      className={`w-full py-3 rounded-full text-xs uppercase font-bold tracking-wider transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                        isCyan
                          ? 'bg-[#06B6D4] hover:bg-[#0891b2] text-black shadow-[#06B6D4]/30'
                          : isPurple
                            ? 'bg-[#A855F7] hover:bg-[#9333ea] text-white shadow-[#A855F7]/30'
                            : isOrange
                              ? 'bg-[#F97316] hover:bg-[#ea580c] text-white shadow-[#F97316]/30'
                              : 'bg-[#EF4444] hover:bg-[#dc2626] text-white shadow-[#EF4444]/30'
                      }`}
                    >
                      <i className="ri-ticket-2-line text-sm" />
                      <span>Reserve Pass</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ticketing Partners & Info Footer Bar */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold font-prompt">
              Official Ticketing Partners:
            </span>
            <a
              href="https://www.ticketsministry.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white hover:border-[#D4A017] hover:text-[#F5C842] transition-colors"
            >
              Tickets Ministry
            </a>
            <a
              href="https://oneticket.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs text-white hover:border-[#D4A017] hover:text-[#F5C842] transition-colors"
            >
              OneTicket
            </a>
            <span className="text-xs text-neutral-500 font-prompt">
              &bull; Official Travel: Uber
            </span>
          </div>

          <p className="text-xs text-[#D4A017] font-prompt font-medium">
            ⚡ Passes are strictly allocated on first-come, first-served basis.
          </p>
        </div>
      </div>

      {/* SEATING ARRANGEMENT LIGHTBOX MODAL */}
      {showSeatingModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
          onClick={() => setShowSeatingModal(false)}
        >
          <button
            onClick={() => setShowSeatingModal(false)}
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-[#D4A017] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label="Close seating plan"
          >
            <i className="ri-close-line text-2xl" />
          </button>

          <div
            className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center overflow-y-auto rounded-3xl bg-[#111108] border border-[#D4A017]/30 p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div>
                <h4 className="text-lg sm:text-xl font-display font-bold text-white">
                  University of Peradeniya Gymnasium &bull; Seating Arrangement
                </h4>
                <p className="text-xs text-[#D4A017] font-prompt">
                  Geethanjalee 2026 &bull; December 08 &bull; 7:00 PM Onwards
                </p>
              </div>
            </div>

            <img
              src="/assets/tickets/seating_arrangement.jpg"
              alt="Official Seating Arrangement Diagram"
              className="w-full max-h-[75vh] object-contain rounded-2xl border border-white/15"
            />

            <div className="w-full mt-4 flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-white/10 text-xs font-prompt text-neutral-300">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#06B6D4] font-semibold">
                  ● 5000 LKR (Admiral)
                </span>
                <span className="text-[#A855F7] font-semibold">
                  ● 3000 LKR (Captain)
                </span>
                <span className="text-[#F97316] font-semibold">
                  ● 2000 LKR (Commander)
                </span>
                <span className="text-[#EF4444] font-semibold">
                  ● 1000 LKR (Lieutenant)
                </span>
              </div>
              <span className="text-[#D4A017] font-medium">
                ✨ Refreshments served for Admiral &amp; Captain passes
              </span>
            </div>
          </div>
        </div>
      )}

      {/* PASS RESERVATION MODAL */}
      {selectedPass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-[#111108] border border-[#D4A017]/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4A017] text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close reservation modal"
            >
              <i className="ri-close-line text-xl" />
            </button>

            {reservationResult ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                  <i className="ri-checkbox-circle-line" />
                </div>
                <h4 className="text-2xl font-display font-bold text-white">
                  Reservation Received!
                </h4>
                <div className="inline-block px-4 py-2 rounded-xl bg-white/5 border border-[#D4A017]/40">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-400 block">
                    Reference Code
                  </span>
                  <span className="font-mono text-lg font-bold text-[#F5C842]">
                    {reservationResult.referenceCode}
                  </span>
                </div>
                <p className="text-sm text-neutral-300 font-prompt">
                  Your reservation for{' '}
                  <strong className="text-[#F5C842]">
                    {reservationResult.quantity}x {reservationResult.passTitle}
                  </strong>{' '}
                  ({reservationResult.totalAmount.toLocaleString()}{' '}
                  {reservationResult.currency}) has been recorded.
                </p>
                <p className="text-xs text-neutral-400 font-prompt">
                  Our ticketing desk and partner links (Tickets Ministry /
                  OneTicket) will send payment &amp; e-pass confirmation to{' '}
                  <span className="text-neutral-200">
                    {reservationResult.phone}
                  </span>
                  .
                </p>
                <button
                  onClick={handleCloseModal}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#D4A017] hover:bg-[#F5C842] text-black text-xs uppercase font-bold tracking-wider transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <img
                    src={selectedPass.image}
                    alt={selectedPass.title}
                    className="w-16 h-24 rounded-xl object-cover border border-white/15"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4A017]">
                      {selectedPass.badge}
                    </span>
                    <h4 className="font-display font-bold text-white text-lg truncate">
                      {selectedPass.title}
                    </h4>
                    <p className="text-xs text-neutral-400 font-prompt">
                      {selectedPass.seatingZone}
                    </p>
                    <p className="text-[#F5C842] font-display font-bold text-base mt-1">
                      {selectedPass.price} &bull;{' '}
                      <span className="text-xs text-neutral-400 font-prompt">
                        per pass
                      </span>
                    </p>
                  </div>
                </div>

                {selectedPass.refreshments && (
                  <div className="p-3 rounded-xl bg-[#D4A017]/15 border border-[#D4A017]/40 flex items-center gap-2.5 text-xs text-[#F5C842] font-prompt">
                    <i className="ri-cup-fill text-base shrink-0" />
                    <span>
                      Complimentary premium refreshments are included with this
                      pass tier.
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/10">
                  <span className="text-xs font-semibold text-neutral-300 font-prompt">
                    Pass Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setTicketQuantity(Math.max(1, ticketQuantity - 1))
                      }
                      className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#D4A017] hover:text-black cursor-pointer font-bold"
                    >
                      -
                    </button>
                    <span className="font-display font-bold text-base text-white w-6 text-center">
                      {ticketQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setTicketQuantity(Math.min(10, ticketQuantity + 1))
                      }
                      className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-[#D4A017] hover:text-black cursor-pointer font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2 text-xs font-prompt">
                  <span className="text-neutral-400">Total Payable:</span>
                  <span className="font-display font-bold text-lg text-[#F5C842]">
                    {(
                      selectedPass.priceNumeric * ticketQuantity
                    ).toLocaleString()}{' '}
                    LKR
                  </span>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-xs text-red-300 font-prompt">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="text-xs text-neutral-300 font-medium block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#D4A017]"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-300 font-medium block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#D4A017]"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-300 font-medium block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#D4A017]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-full bg-[#D4A017] hover:bg-[#F5C842] disabled:opacity-60 text-black text-xs uppercase font-bold tracking-wider transition-all mt-3 cursor-pointer shadow-lg shadow-[#D4A017]/30 flex items-center justify-center gap-2"
                >
                  <i className="ri-check-line text-base" />
                  <span>
                    {isSubmitting
                      ? 'Submitting Reservation...'
                      : 'Confirm Reservation'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
