import { Controller, Get, Param } from '@nestjs/common';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get('overview')
  getOverview() {
    return this.concertService.getOverview();
  }

  @Get('config')
  getSiteConfig() {
    return this.concertService.getSiteConfig();
  }

  @Get('tracks')
  getTracks() {
    return this.concertService.getTracks();
  }

  @Get('schedule')
  getSchedule() {
    return this.concertService.getSchedule();
  }

  @Get('artists')
  getArtists() {
    return this.concertService.getArtists();
  }

  @Get('artists/:id')
  getArtistById(@Param('id') id: string) {
    return this.concertService.getArtistById(id);
  }

  @Get('tickets')
  getTickets() {
    return this.concertService.getTickets();
  }

  @Get('gallery')
  getGallery() {
    return this.concertService.getGallery();
  }

  @Get('achievements')
  getAchievements() {
    return this.concertService.getAchievements();
  }
}
