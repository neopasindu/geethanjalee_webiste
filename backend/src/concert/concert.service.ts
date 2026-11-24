import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ACHIEVEMENTS,
  ARTISTS,
  CONCERT_SCHEDULE,
  GALLERY_ITEMS,
  SAMPLE_TRACKS,
  SITE_CONFIG,
  TICKET_PASSES,
} from './concert.data';
import {
  Achievement,
  ArtistProfile,
  ConcertSchedule,
  GalleryItem,
  SiteConfig,
  TicketPass,
  Track,
} from './concert.types';

@Injectable()
export class ConcertService {
  getOverview() {
    return {
      siteConfig: SITE_CONFIG,
      tracks: SAMPLE_TRACKS,
      schedule: CONCERT_SCHEDULE,
      artists: ARTISTS,
      tickets: TICKET_PASSES,
      gallery: GALLERY_ITEMS,
      achievements: ACHIEVEMENTS,
    };
  }

  getSiteConfig(): SiteConfig {
    return SITE_CONFIG;
  }

  getTracks(): Track[] {
    return SAMPLE_TRACKS;
  }

  getSchedule(): ConcertSchedule[] {
    return CONCERT_SCHEDULE;
  }

  getArtists(): ArtistProfile[] {
    return ARTISTS;
  }

  getArtistById(id: string): ArtistProfile {
    const artist = ARTISTS.find((item) => item.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id "${id}" not found`);
    }
    return artist;
  }

  getTickets(): TicketPass[] {
    return TICKET_PASSES;
  }

  getTicketById(id: string): TicketPass | undefined {
    return TICKET_PASSES.find((pass) => pass.id === id);
  }

  getGallery(): GalleryItem[] {
    return GALLERY_ITEMS;
  }

  getAchievements(): Achievement[] {
    return ACHIEVEMENTS;
  }
}
