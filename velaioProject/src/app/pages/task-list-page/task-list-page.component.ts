import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { ITask } from '../../models/task.model';

import { TaskService } from '../../service/task.service';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list-page',
  standalone: true,
  imports: [CommonModule, TaskListComponent, TaskFilterComponent, RouterModule],
  templateUrl: './task-list-page.component.html',
  styleUrls: ['./task-list-page.component.css'],
})
export class TaskListPageComponent {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.tasks$;
  filteredTasks: ITask[] = [];

  constructor() {

    this.tasks$.subscribe((tasks) => {
      this.filteredTasks = tasks;
    });
  }


  onFilterChanged(filter: string) {
    this.tasks$.subscribe((tasks) => {
      switch (filter) {
        case 'completed':
          this.filteredTasks = tasks.filter((task) => task.isCompleted);
          break;
        case 'pending':
          this.filteredTasks = tasks.filter((task) => !task.isCompleted);
          break;
        default:
          this.filteredTasks = tasks;
          break;
      }
    });
  }
}
