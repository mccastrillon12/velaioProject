import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ITask } from '../../models/task.model';
import { TaskService } from '../../service/task.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';

@Component({
  selector: 'app-edit-task-page',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.css'],
})
export class EditTaskPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router = inject(Router);

  taskId!: number;
  taskToEdit?: ITask;

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskToEdit = this.taskService.getTaskById(this.taskId);

    if (!this.taskToEdit) {
      this.router.navigate(['/']);
    }
  }

  onTaskSaved() {
    this.router.navigate(['/all-tasks']);
  }
}