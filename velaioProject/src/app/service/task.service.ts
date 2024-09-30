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

  markTaskAsCompleted(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.isCompleted = true;
      this.tasksSubject.next(this.tasks);
    }
  }

  getTaskById(taskId: number): ITask | undefined {
    return this.tasks.find(task => task.id === taskId);
  }

  updateTask(taskId: number, updatedTask: Partial<ITask>) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      this.tasksSubject.next(this.tasks);
    }
  }
  
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.tasksSubject.next(this.tasks);
  }
}