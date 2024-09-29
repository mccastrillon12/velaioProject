import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, TaskFormComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isMenuOpen = false;
  title = 'velaioProject';
  constructor(private router: Router) {}
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false; 
  }
}


