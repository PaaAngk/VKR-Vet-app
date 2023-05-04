import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  // {
  //   id: createEventId(),
  //   title: 'All-day event',
  //   start: TODAY_STR
  // },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T10:00:00',
    end: TODAY_STR + 'T13:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00',
  },
  {
    id: createEventId(),
    title: 'Timed event11',
    start: TODAY_STR + 'T15:30:00',
    end: TODAY_STR + 'T17:00:00',
  },
  {
    id: createEventId(),
    title: 'SDf sdfsdfsdg ',
    start: TODAY_STR + 'T18:00:00',
    end: TODAY_STR + '19:30:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}
