import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConcertModule } from './concert/concert.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [ConcertModule, ReservationsModule],
  controllers: [AppController],
})
export class AppModule {}
