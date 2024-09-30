import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-create-page',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-create-page.component.html',
  styleUrls: ['./task-create-page.component.css']
})
export class TaskCreatePageComponent {
  constructor(private router: Router) { }

  onTaskSaved() {
    this.router.navigate(['/all-tasks']);
  }
}