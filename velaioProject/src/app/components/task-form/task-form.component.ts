import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PersonFormComponent } from '../person-form/person-form.component';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../models/task.model';
import { IPerson } from '../../models/person.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PersonFormComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() taskToEdit?: ITask;
  @Output() taskSaved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  today: string;
  isAddingPerson: boolean = false;

  // Declarar el Map para almacenar los valores originales
  private originalPersonValues = new Map<FormGroup, any>();

  constructor() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    this.today = currentDate.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.initializeForm();
  }

  taskForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    deadline: ['', Validators.required],
    persons: this.fb.array([]),
  });

  initializeForm() {
    if (this.taskToEdit) {
      this.taskForm.patchValue({
        name: this.taskToEdit.name,
        deadline: this.taskToEdit.deadline,
      });

      this.taskToEdit.people.forEach((person: IPerson) => {
        this.addPerson(person);
      });
    }
  }

  get persons(): FormArray {
    return this.taskForm.get('persons') as FormArray;
  }

  getPersonForm(index: number): FormGroup {
    return this.persons.at(index) as FormGroup;
  }

  getSkills(personIndex: number): FormArray {
    return this.getPersonForm(personIndex).get('skills') as FormArray;
  }

  addPerson(person?: IPerson) {
    if (!person) {
      this.isAddingPerson = true;
    }

    const personForm = this.fb.group({
      fullName: [person ? person.fullName : '', [Validators.required, Validators.minLength(5)]],
      age: [person ? person.age : '', [Validators.required, Validators.min(18)]],
      skills: this.fb.array(
        person
          ? person.skills.map((skill: string) => this.fb.control(skill, Validators.required))
          : [this.fb.control('', Validators.required)]
      ),
      isEditing: [person ? false : true],
      isNew: [person ? false : true], // Añadir la bandera isNew
    });

    this.persons.push(personForm);
  }

  editPerson(index: number) {
    const person = this.persons.at(index) as FormGroup;
    // Guardar valores originales en el Map
    this.originalPersonValues.set(person, person.getRawValue());
    person.get('isEditing')?.setValue(true);
    this.isAddingPerson = true;
  }

  onSavePerson(index: number) {
    const person = this.persons.at(index) as FormGroup;
    person.get('isEditing')?.setValue(false);
    person.get('isNew')?.setValue(false);
    // Eliminar los valores originales del Map
    this.originalPersonValues.delete(person);
    this.isAddingPerson = false;
  }

  cancelPerson(index: number) {
    const person = this.persons.at(index) as FormGroup;
    if (person.get('isNew')?.value) {
      // Si es una nueva persona, eliminarla de la lista
      this.persons.removeAt(index);
    } else {
      // Si es una persona existente, salir del modo de edición y restaurar valores originales
      person.get('isEditing')?.setValue(false);
      this.restoreOriginalPersonValues(person);
    }
    this.isAddingPerson = false;
  }

  restoreOriginalPersonValues(person: FormGroup) {
    const originalValues = this.originalPersonValues.get(person);
    if (originalValues) {
      person.reset(originalValues);
      this.originalPersonValues.delete(person);
    }
  }

  removePerson(index: number) {
    this.persons.removeAt(index);
    this.isAddingPerson = false;
  }

  isNameDuplicate(index: number): boolean {
    const currentName = this.persons.at(index).get('fullName')?.value;
    const names = this.persons.controls.map(control => control.get('fullName')?.value);
    return names.filter(name => name === currentName).length > 1;
  }

  hasDuplicateNames(): boolean {
    const names = this.persons.controls.map(control => control.get('fullName')?.value);
    const uniqueNames = new Set(names);
    return uniqueNames.size !== names.length;
  }

  saveTask() {
    if (this.taskForm.valid && !this.hasDuplicateNames()) {
      if (this.taskToEdit) {
        const updatedTask: Partial<ITask> = {
          ...this.taskToEdit,
          ...this.taskForm.value,
          people: this.persons.value,
        };
        this.taskService.updateTask(this.taskToEdit.id, updatedTask);
      } else {
        const newTask: ITask = {
          ...this.taskForm.value,
          id: Math.random(),
          isCompleted: false,
          people: this.persons.value,
        };
        this.taskService.addTask(newTask);
      }

      this.taskForm.reset();
      this.persons.clear();
      this.taskSaved.emit();
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  markTaskAsCompleted() {
    if (this.taskToEdit) {
      const updatedTask: Partial<ITask> = {
        ...this.taskToEdit,
        ...this.taskForm.value,
        isCompleted: true,
        people: this.persons.value,
      };
      this.taskService.updateTask(this.taskToEdit.id, updatedTask);
      this.taskSaved.emit();
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  confirmRemovePerson(index: number) {
    const confirmation = window.confirm('¿Estás seguro de que quieres eliminar a esta persona?');
    if (confirmation) {
      this.removePerson(index);
    }
  }
}
