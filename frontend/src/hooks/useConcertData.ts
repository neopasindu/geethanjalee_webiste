import { useEffect, useState } from 'react';
import { FALLBACK_OVERVIEW } from '@/constants';
import { concertApi } from '@/services/api';
import { ConcertOverview } from '@/types';

export function useConcertData() {
  const [data, setData] = useState<ConcertOverview>(FALLBACK_OVERVIEW);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    let cancelled = false;

    concertApi
      .getOverview()
      .then((overview) => {
        if (!cancelled) {
          setData(overview);
          setApiConnected(true);
        }
      })
      .catch(() => {
        // Gracefully keep fallback data if backend is offline
        if (!cancelled) {
          setApiConnected(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, apiConnected };
}
