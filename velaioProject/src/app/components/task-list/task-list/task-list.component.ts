import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  markAsCompleted(taskId: number) {
    this.taskService.markTaskAsCompleted(taskId);
  }
}
