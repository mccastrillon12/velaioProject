import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener } from '@angular/core';
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
  constructor(private router: Router,private elementRef: ElementRef) {}
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isMenuOpen = false; 
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}


