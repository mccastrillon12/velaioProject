import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.css'
})
export class PersonFormComponent {
  private fb = inject(FormBuilder);

  @Input() personForm!: FormGroup;

  get skills(): FormArray {
    return this.personForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }

  removeSkill(skillIndex: number) {
    this.skills.removeAt(skillIndex);
  }
}
