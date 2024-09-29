import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ITask } from '../../models/task.model';
import { TaskService } from '../../service/task.service';
import { IPerson } from '../../models/person.model';
import { PersonFormComponent } from '../../components/person-form/person-form.component';

@Component({
  selector: 'app-edit-task-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PersonFormComponent],
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.css'],
})
export class EditTaskPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  taskForm!: FormGroup;
  taskId!: number;
  today: string;
  originalPersonData: { [key: number]: IPerson } = {};

  constructor() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.today = currentDate.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    const task = this.taskService.getTaskById(this.taskId);

    if (task) {
      this.taskForm = this.fb.group({
        name: [task.name, [Validators.required, Validators.minLength(3)]],
        deadline: [task.deadline, Validators.required],
        people: this.fb.array([]),
      });

      task.people.forEach((person: IPerson, index: number) => {
        this.addPerson(person);
        this.originalPersonData[index] = { ...person };
      });
    }
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  getPersonForm(index: number): FormGroup {
    return this.people.at(index) as FormGroup;
  }

  addPerson(person?: IPerson) {
    const personForm = this.fb.group({
      fullName: [person ? person.fullName : '', [Validators.required, Validators.minLength(5)]],
      age: [person ? person.age : '', [Validators.required, Validators.min(18)]],
      skills: this.fb.array(
        person
          ? person.skills.map((skill: string) => this.fb.control(skill, Validators.required))
          : [this.fb.control('', Validators.required)]
      ),
      isEditing: [person ? false : true],
    });

    this.people.push(personForm);
  }

  editPerson(index: number) {
    const person = this.people.at(index);
    person.get('isEditing')?.setValue(true);
    this.originalPersonData[index] = { ...person.value };
  }

  onSavePerson(index: number) {
    const person = this.people.at(index);
    person.get('isEditing')?.setValue(false);
  }

  cancelEditPerson(index: number) {
    const person = this.people.at(index);

    if (this.originalPersonData[index]) {
      person.patchValue(this.originalPersonData[index]);
    }
    person.get('isEditing')?.setValue(false);
  }

  removePerson(index: number) {
    this.people.removeAt(index);
    delete this.originalPersonData[index];
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  hasDuplicateNames(): boolean {
    const names = this.people.controls.map(control => control.get('fullName')?.value);
    const uniqueNames = new Set(names);
    return uniqueNames.size !== names.length;
  }

  isNameDuplicate(index: number): boolean {
    const currentName = this.people.at(index).get('fullName')?.value;
    const names = this.people.controls.map(control => control.get('fullName')?.value);
    return names.filter(name => name === currentName).length > 1;
  }

  saveTask() {
    if (this.taskForm.valid && !this.hasDuplicateNames()) {
      const updatedTask: Partial<ITask> = {
        ...this.taskForm.value,
      };
      this.taskService.updateTask(this.taskId, updatedTask);
      this.router.navigate(['/all-tasks']);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  markTaskAsCompleted() {
    if (this.taskForm.valid) {
      const updatedTask: Partial<ITask> = {
        ...this.taskForm.value,
        isCompleted: true,
      };
      this.taskService.updateTask(this.taskId, updatedTask);
      this.router.navigate(['/all-tasks']);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
