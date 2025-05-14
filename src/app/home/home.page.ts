import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  upcomingEvents = [
    {
      title: 'Introduction to Ionic',
      date: new Date('2024-12-10T10:00:00'),
      description: 'Learn the basics of building apps with Ionic.',
    },
    {
      title: 'Angular 101',
      date: new Date('2024-12-15T14:00:00'),
      description: 'An introductory session on Angular framework.',
    },
    {
      title: 'Live Q&A with Instructors',
      date: new Date('2024-12-18T16:00:00'),
      description: 'A live Q&A session to address your questions.',
    }
  ];

  constructor() {}

  ngOnInit() {}
}
