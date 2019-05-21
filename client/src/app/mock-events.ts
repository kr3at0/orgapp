import { Event } from './event';

export const EVENTS: Event[] = [
    { 
        id: 1, 
        content: 'Meeting', 
        schedule: { 
            start: "2019-05-17 11:00",
            end: "2019-05-17 11:30"
        },
    },
    {
        id: 2, 
        content: 'Get present', 
        schedule: { 
            start: "2019-05-17 00:00",
            end: "2019-05-17 00:30"
        }
    },
    {
        id: 3, 
        content: 'Call mom', 
        schedule: { 
            start: "2019-05-17 00:00",
            end: "2019-05-17 00:30"
        }
    }
];