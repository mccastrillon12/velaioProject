import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, TaskListComponent],
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.css']
})
export class TaskListPageComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
}
