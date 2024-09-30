
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
  today: string;
  completionPercentage: number = 0;

  constructor() {

    const currentDate = new Date();
    this.today = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
      this.calculateCompletionPercentage();
    });
  }


  calculateCompletionPercentage() {
    if (this.tasks.length === 0) {
      this.completionPercentage = 0;
    } else {
      const completedTasks = this.tasks.filter(task => task.isCompleted).length;
      this.completionPercentage = Math.round((completedTasks / this.tasks.length) * 100);
    }
  }


  getStrokeDashArray(): string {
    const progress = (this.completionPercentage / 100) * (2 * Math.PI * 30);
    const remaining = 2 * Math.PI * 30;
    return `${progress} ${remaining}`;
  }
}






