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
  status: "coming-soon" | "tickets-live" | "sold-out" | "past";
  ticketUrl?: string;
}

export interface Artist {
  id: string;
  name: string;
  stageName: string;
  role: string;
  image: string;
  bio?: string;
  instagram?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  colSpan?: number; // for bento grid
  rowSpan?: number;
}

export interface TicketPass {
  id: string;
  title: string;
  badge: string;
  price: string;
  priceNumeric: number;
  image: string;
  colorScheme: "cyan" | "purple" | "orange" | "red";
  hexColor: string;
  seatingZone: string;
  refreshments: boolean;
  perks: string[];
  status: "available" | "fast-filling" | "sold-out";
}

export interface MerchItem {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  status: "available" | "dropping-soon" | "sold-out";
}

export interface NavItem {
  label: string;
  href: string;
  iconName: string;
}
