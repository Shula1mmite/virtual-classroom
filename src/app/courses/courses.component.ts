import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  // Example data for featured courses
  courses = [
    {
      title: 'Introduction to Programming',
      description: 'Learn the fundamentals of programming with hands-on examples.',
      image: 'assets/programming.jpg',
      category: 'Programming',
      tags: ['Beginner'],
    },
    {
      title: 'Advanced Mathematics',
      description: 'Master complex math concepts with this in-depth course.',
      image: 'assets/mathematics.jpg',
      category: 'Math',
      tags: ['Advanced'],
    },
    {
      title: 'Physics for Beginners',
      description: 'Start your journey in physics with easy-to-understand lessons.',
      image: 'assets/physics.jpg',
      category: 'Science',
      tags: ['Beginner'],
    },
    {
      title: 'JavaScript Deep Dive',
      description: 'A deep dive into JavaScript for experienced developers.',
      image: 'assets/java.jpg',
      category: 'Programming',
      tags: ['Intermediate'],
    },
    {
      title: 'Calculus 101',
      description: 'Get introduced to calculus concepts with real-world examples.',
      image: 'assets/icon/calc.jpg',
      category: 'Math',
      tags: ['Beginner'],
    },
  ];

  // Categories
  categories = ['All', 'Programming', 'Math', 'Science'];

  selectedCategory = 'All';  // Default category

  constructor() {}

  ngOnInit() {}

  // Filter courses by category
  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredCourses() {
    if (this.selectedCategory === 'All') {
      return this.courses;
    } else {
      return this.courses.filter(course => course.category === this.selectedCategory);
    }
  }

  // Helper method to format course titles for router link
  formatCourseTitle(title: string): string {
    return title.replace(' ', '-').toLowerCase(); // Converts spaces to dashes and makes lowercase
  }
}
