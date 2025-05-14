import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources: any[] = []; // List of uploaded resources

  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.fetchResources(); // Fetch existing resources from Firebase
  }

  // Fetch resources from Firebase (Only Display)
  fetchResources() {
    this.db
      .list('resources') // We will store the resources under this path in Firebase
      .valueChanges()
      .subscribe((resources: any[]) => {
        this.resources = resources;
      });
  }
}
