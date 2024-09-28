import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-task-create-page',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './task-create-page.component.html',
  styleUrls: ['./task-create-page.component.css']
})
export class TaskCreatePageComponent {}
