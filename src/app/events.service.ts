import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Events } from './event';

@Injectable()
export class EventsService {
    events: Events[];
    constructor(private httpClient: HttpClient) { }
    getEvents(): Observable<Events[]> {
        return this.httpClient.get<Events[]>('assets/events.json');
    }

}