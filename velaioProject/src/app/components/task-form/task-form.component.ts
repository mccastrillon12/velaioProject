import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonFormComponent } from '../person-form/person-form.component';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../models/task.model';
import { Router } from '@angular/router';




@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PersonFormComponent],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    deadline: ['', Validators.required],
    people: this.fb.array([]),
  });


  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  addPerson() {
    const personForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)]),
    });

    this.people.push(personForm);
  }

  removePerson(index: number) {
    this.people.removeAt(index);
  }


  getPersonFormGroup(index: number): FormGroup {
    return this.people.at(index) as FormGroup;
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

      this.router.navigate(['/all-tasks']);
    }
  }
}
