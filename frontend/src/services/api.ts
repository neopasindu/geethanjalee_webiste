import {
  ConcertOverview,
  CreateReservationPayload,
  ReservationResponse,
} from '@/types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const errBody = (await response.json()) as {
        message?: string | string[];
      };
      if (Array.isArray(errBody.message)) {
        message = errBody.message.join(', ');
      } else if (typeof errBody.message === 'string') {
        message = errBody.message;
      }
    } catch {
      // ignore non-json error response
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export const concertApi = {
  getOverview: () => request<ConcertOverview>('/concert/overview'),
  createReservation: (payload: CreateReservationPayload) =>
    request<ReservationResponse>('/reservations', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
