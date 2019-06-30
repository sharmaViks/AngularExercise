import { Component, OnInit } from '@angular/core';
import { Events } from '../event';
import { EventsService } from '../events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events:Events[];
  imageWidth = 215;
  imageHeight = 150;
  imageMargin = 12;
  listFilter: string;

  constructor(private eventsService:EventsService,private router:Router) { 
    this.eventsService.getEvents().subscribe(
      events=>{
        this.eventsService.events = events;
        this.events=events;
      }
    ) 
  }

  ngOnInit() {
  }
  searchtext(){
    this.events=this.eventsService.events;
    if (this.listFilter.length > 0) {
        this.events = this.events.filter((event: Events) =>
        event.name.toLowerCase().indexOf(this.listFilter.toLowerCase()) !== -1);
    }
  }
bookEvent(name:string){
this.router.navigate(['/bookevent',name]);

}

}
