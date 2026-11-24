import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { ConcertService } from '../concert/concert.service';
import { ReservationRecord } from '../concert/concert.types';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger(ReservationsService.name);
  private readonly storageFile = path.join(
    process.cwd(),
    'data',
    'reservations.json',
  );
  private reservations: ReservationRecord[] = [];

  constructor(private readonly concertService: ConcertService) {
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.storageFile)) {
        const raw = fs.readFileSync(this.storageFile, 'utf-8');
        this.reservations = JSON.parse(raw) as ReservationRecord[];
      }
    } catch (error) {
      this.logger.warn(
        `Could not read reservations file, starting fresh: ${String(error)}`,
      );
      this.reservations = [];
    }
  }

  private saveToDisk() {
    try {
      const dir = path.dirname(this.storageFile);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(
        this.storageFile,
        JSON.stringify(this.reservations, null, 2),
        'utf-8',
      );
    } catch (error) {
      this.logger.error(`Failed to persist reservations: ${String(error)}`);
    }
  }

  create(dto: CreateReservationDto): ReservationRecord {
    const pass = this.concertService.getTicketById(dto.passId);
    if (!pass) {
      throw new BadRequestException(`Invalid ticket pass tier: "${dto.passId}"`);
    }
    if (pass.status === 'sold-out') {
      throw new BadRequestException(`${pass.title} is currently sold out.`);
    }

    const codeSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const record: ReservationRecord = {
      id: randomUUID(),
      referenceCode: `GEETH-2026-${codeSuffix}`,
      passId: pass.id,
      passTitle: pass.title,
      unitPrice: pass.priceNumeric,
      quantity: dto.quantity,
      totalAmount: pass.priceNumeric * dto.quantity,
      currency: 'LKR',
      fullName: dto.fullName.trim(),
      phone: dto.phone.trim(),
      email: dto.email.trim().toLowerCase(),
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
    };

    this.reservations.unshift(record);
    this.saveToDisk();

    return record;
  }

  findAll(): ReservationRecord[] {
    return this.reservations;
  }

  findByReference(referenceCode: string): ReservationRecord {
    const match = this.reservations.find(
      (item) =>
        item.referenceCode.toLowerCase() === referenceCode.trim().toLowerCase(),
    );
    if (!match) {
      throw new NotFoundException(
        `Reservation "${referenceCode}" was not found`,
      );
    }
    return match;
  }
}
