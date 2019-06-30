import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventsService } from '../events.service';
import { Events } from '../event';
import { Form, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-event-book',
  templateUrl: './event-book.component.html',
  styleUrls: ['./event-book.component.css']
})
export class EventBookComponent implements OnInit {
  eventFound: Events;
  disableCancel = false;
  bookingForm: FormGroup;
  numberOfSeats = [1, 2, 3, 4, 5, 6];
  maxSeats;
  noOfSeats: FormControl;
  username: FormControl;
  email: FormControl;
  phoneNo: FormControl;
  attendees: FormArray;

  constructor(private route: ActivatedRoute, private eventService: EventsService, private router: Router) {
  }

  ngOnInit() {
    this.username = new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")]));
    this.email = new FormControl('', Validators.compose([Validators.required, Validators.email]));
    this.phoneNo = new FormControl('', Validators.compose([Validators.minLength(10), Validators.maxLength(10)])); //yanha pe min max wala cjheck kaise ?
    this.noOfSeats = new FormControl('', Validators.compose([Validators.required]));
    this.attendees = new FormArray([]);
    this.bookingForm = new FormGroup({
      'username': this.username,
      'email': this.email,
      'phoneNo': this.phoneNo,
      'noOfSeats': this.noOfSeats,
      'attendess': this.attendees
    });
    this.route.params.subscribe((params: Params) => {
      this.eventService.getEvents().subscribe(
        (events: Events[]) => {
          events.filter((eventList) => {
            if (eventList.name == params['name']) {
              this.eventFound = eventList;
              this.maxSeats = eventList.seatsAvailable;
              document.getElementById("eventName").innerText = this.eventFound.name;
              document.getElementById("noOfSeats").innerText = this.eventFound.seatsAvailable.toString();
            }
          });
        }
      )
    }
    )
  }

  checkAvailableSeats(event: FormControl) {
    this.clearAttendees();
    if (parseInt(event.value) > parseInt(this.maxSeats)) {
      event.setErrors({
        max: true
      });
    } else {
      this.addAttendees(parseInt(event.value));
    }
  }

  addAttendees(count: number) {
    for (let i = 0; i < count - 1; i++) {
      this.attendees.push(new FormGroup({
        'username': new FormControl('', Validators.compose([Validators.required, Validators.pattern("[a-zA-Z ]*")]))
      }));
    }
  }
  clearAttendees() {
    while (this.attendees.length > 0) {
      this.attendees.removeAt(0)
    }
  }

  cancelFormSubmit() {
    this.router.navigate(['']);
  }
  onSubmit(form: Form) {
    this.disableCancel = true;
    console.log(form);
    this.bookingForm.reset();
    this.clearAttendees();


  }

}
