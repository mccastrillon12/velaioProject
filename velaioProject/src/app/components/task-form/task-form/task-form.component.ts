import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { ITask } from '../../../models/task.model';
import { TaskService } from '../../../service/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PersonFormComponent],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    deadline: ['', Validators.required],
    persons: this.fb.array([]),
  });

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });

    this.persons.push(personForm);
  }

  removePerson(index: number) {
    this.persons.removeAt(index);
  }


  getPersonFormGroup(index: number): FormGroup {
    return this.persons.at(index) as FormGroup;
  }

  saveTask() {
    if (this.taskForm.valid) {
      const newTask: ITask = {
        ...this.taskForm.value,
        id: Math.random(),
        isCompleted: false,
      };
      this.taskService.addTask(newTask);
      this.taskForm.reset();
    }
  }
}
