import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from '../../models/task.model';
import { TaskService } from '../../service/task.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: ITask[] = [];
  private taskService = inject(TaskService);

  markAsCompleted(taskId: number) {
    this.taskService.markTaskAsCompleted(taskId);
  }
}
