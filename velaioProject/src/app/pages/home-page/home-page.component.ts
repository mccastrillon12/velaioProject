import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { ITask } from '../../models/task.model';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TaskListComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  private taskService = inject(TaskService);
  tasks: ITask[] = [];

  constructor() {
   
    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }
}
