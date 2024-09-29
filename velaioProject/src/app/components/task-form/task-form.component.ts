import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonFormComponent } from '../person-form/person-form.component';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PersonFormComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  today: string;

  constructor() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.today = currentDate.toISOString().split('T')[0]; }

  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    deadline: ['', Validators.required],
    persons: this.fb.array([]),
    duplicateNamesError: [false], 
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

  addSkill(personIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.push(new FormControl('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.removeAt(skillIndex);
  }

  getSkills(personIndex: number): FormArray {
    return this.persons.at(personIndex).get('skills') as FormArray;
  }

  hasDuplicateNames(): boolean {
    const names = this.persons.controls.map(control => control.get('fullName')?.value);
    const uniqueNames = new Set(names);
    return uniqueNames.size !== names.length;
  }

  isNameDuplicate(index: number): boolean {
    const currentName = this.persons.at(index).get('fullName')?.value;
    const names = this.persons.controls.map(control => control.get('fullName')?.value);
    return names.filter(name => name === currentName).length > 1;
  }

  saveTask() {
    if (this.taskForm.valid && !this.hasDuplicateNames()) {
      const newTask: ITask = {
        ...this.taskForm.value,
        id: Math.random(),
        isCompleted: false,
        people: this.persons.value,
      };
      this.taskService.addTask(newTask);


      this.taskForm.reset();
      this.persons.clear(); 
      this.addPerson(); 

      this.router.navigate(['/all-tasks']);
    } else {

      if (this.hasDuplicateNames()) {
        this.taskForm.get('duplicateNamesError')?.setValue(true);
      } else {
        this.taskForm.get('duplicateNamesError')?.setValue(false);
      }
      this.taskForm.markAllAsTouched();
    }
  }
}