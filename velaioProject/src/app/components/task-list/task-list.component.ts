import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from '../../models/task.model';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../service/task.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  @Input() tasks: ITask[] = [];
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;

  markAsCompleted(taskId: number) {
    this.taskService.markTaskAsCompleted(taskId);
  }
}