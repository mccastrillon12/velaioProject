import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent {
  @Input() personForm!: FormGroup;
  @Input() isNameDuplicate!: boolean;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  get skills(): FormArray {
    return this.personForm.get('skills') as FormArray;
  }

  addSkill() {
    this.skills.push(new FormControl('', Validators.required));
  }

  removeSkill(index: number) {
    if (this.skills.length > 1) {
      this.skills.removeAt(index);
    }
  }

  onSave() {
    if (this.personForm.valid) {
      this.save.emit(); 
    } else {
      this.personForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
