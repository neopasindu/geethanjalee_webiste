export interface HeroSlide {
  id: string;
  tagline: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  bgImage: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  edition: string;
  university: string;
  dateText: string;
  venueText: string;
  heroSlides: HeroSlide[];
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    spotify: string;
    tiktok: string;
  };
  partners: {
    presenter: string;
    poweredBy: string;
    ticketing: { name: string; url: string }[];
    travel: string;
    media: string[];
  };
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl: string;
  coverImage: string;
}

export interface ConcertSchedule {
  id: string;
  year: string;
  month: string;
  day: string;
  weekday: string;
  venue: string;
  city: string;
  status: 'coming-soon' | 'tickets-live' | 'sold-out' | 'past';
  ticketUrl?: string;
}

export interface ArtistProfile {
  id: string;
  name: string;
  stageName: string;
  role: string;
  origin: string;
  bio: string;
  hits: string[];
  accolades: string;
  image: string;
  instagramHandle: string;
  youtubeHandle: string;
  accentColor: string;
  isBand?: boolean;
  bandMembers?: string[];
  bandLogos?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  colSpan?: number;
  rowSpan?: number;
}

export interface TicketPass {
  id: string;
  title: string;
  badge: string;
  price: string;
  priceNumeric: number;
  image: string;
  colorScheme: 'cyan' | 'purple' | 'orange' | 'red';
  hexColor: string;
  seatingZone: string;
  refreshments: boolean;
  perks: string[];
  status: 'available' | 'fast-filling' | 'sold-out';
}

export interface Achievement {
  label: string;
  year: string;
}

export interface ReservationRecord {
  id: string;
  referenceCode: string;
  passId: string;
  passTitle: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  currency: 'LKR';
  fullName: string;
  phone: string;
  email: string;
  status: 'pending_payment' | 'confirmed' | 'cancelled';
  createdAt: string;
}
