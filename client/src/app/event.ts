class Timespan {
    start: string;
    end: string;
}

export class Event {
    id: number;
    content: string;
    schedule: Timespan;
}