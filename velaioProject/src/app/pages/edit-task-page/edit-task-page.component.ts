import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ITask,  } from '../../models/task.model';
import { TaskService } from '../../service/task.service';
import { IPerson } from '../../models/person.model';

@Component({
  selector: 'app-edit-task-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    const task = this.taskService.getTaskById(this.taskId);

    if (task) {
      this.taskForm = this.fb.group({
        name: [task.name, [Validators.required, Validators.minLength(3)]],
        deadline: [task.deadline, Validators.required],
        people: this.fb.array([]),
      });

      task.people.forEach((person: IPerson) => {
        this.addPerson(person);
      });
    }
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
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
      isEditing: [false] 
    });

    this.people.push(personForm);
  }

  editPerson(index: number) {
    const person = this.people.at(index);
    person.get('isEditing')?.setValue(true);   }

  removePerson(index: number) {
    this.people.removeAt(index);
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  addSkill(personIndex: number) {
    this.getSkills(personIndex).push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number) {
    this.getSkills(personIndex).removeAt(skillIndex);
  }

  saveTask() {
    if (this.taskForm.valid) {
      const updatedTask: Partial<ITask> = {
        ...this.taskForm.value,
      };
      this.taskService.updateTask(this.taskId, updatedTask);
      this.router.navigate(['/all-tasks']);
    }
  }
}