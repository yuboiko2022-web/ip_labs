import { uk, enGB, enUS, ja, fr, de, ptBR, tr, ar, enCA, ko, es, hi } from 'date-fns/locale';

export const cities = [
  { name: 'Lviv', zone: 'Europe/Kyiv', locale: uk },
  { name: 'London', zone: 'Europe/London', locale: enGB },
  { name: 'New York', zone: 'America/New_York', locale: enUS },
  { name: 'Tokyo', zone: 'Asia/Tokyo', locale: ja },
  { name: 'Paris', zone: 'Europe/Paris', locale: fr },
  { name: 'Berlin', zone: 'Europe/Berlin', locale: de },
  { name: 'Sydney', zone: 'Australia/Sydney', locale: enGB },
  { name: 'Rio de Janeiro', zone: 'America/Sao_Paulo', locale: ptBR },
  { name: 'Istanbul', zone: 'Europe/Istanbul', locale: tr },
  { name: 'Dubai', zone: 'Asia/Dubai', locale: ar },
  { name: 'Toronto', zone: 'America/Toronto', locale: enCA },
  { name: 'Seoul', zone: 'Asia/Seoul', locale: ko },
  { name: 'Buenos Aires', zone: 'America/Argentina/Buenos_Aires', locale: es },
  { name: 'Mumbai', zone: 'Asia/Kolkata', locale: hi }
];