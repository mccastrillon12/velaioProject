import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];
  private tasksSubject = new BehaviorSubject<ITask[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(task: ITask) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  updateTask(updatedTask: ITask) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
  }

  markTaskAsCompleted(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.isCompleted = true;
      this.tasksSubject.next(this.tasks);
    }
  }
}
