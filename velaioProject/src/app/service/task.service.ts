<div class="container">
  <h1>Edit Task</h1>
  <form [formGroup]="taskForm" (ngSubmit)="saveTask()">
 
    <div>
      <label for="name">Task Name</label>
      <input id="name" formControlName="name" />
      <div *ngIf="taskForm.get('name')?.invalid && taskForm.get('name')?.touched" class="error">
        <div *ngIf="taskForm.get('name')?.errors?.['required']">Task Name is required.</div>
        <div *ngIf="taskForm.get('name')?.errors?.['minlength']">Task Name must be at least 3 characters.</div>
      </div>
    </div>


    <div>
      <label for="deadline">Deadline</label>
      <input type="date" id="deadline" formControlName="deadline" [min]="today" />
      <div *ngIf="taskForm.get('deadline')?.invalid && taskForm.get('deadline')?.touched" class="error">
        <div *ngIf="taskForm.get('deadline')?.errors?.['required']">Deadline is required.</div>
      </div>
    </div>

 
    <div formArrayName="people">
      <h2>People</h2>
      <ul>
        <li *ngFor="let person of people.controls; let i = index">
         
          <div *ngIf="person.get('isEditing')?.value" [formGroupName]="i">
            <label>Full Name</label>
            <input formControlName="fullName" />
            <div *ngIf="person.get('fullName')?.invalid && person.get('fullName')?.touched" class="error">
            <div *ngIf="person.get('fullName')?.errors?.['required']">Full Name is required.</div>
            <div *ngIf="person.get('fullName')?.errors?.['minlength']">Full Name must be at least 5 characters.</div>
          </div>
          <div *ngIf="isNameDuplicate(i)" class="error">This name is already used. Please use a unique name.</div>

          <label>Age</label>
          <input type="number" formControlName="age" />
              <div *ngIf="person.get('fullName')?.errors?.['required']">Full Name is required.</div>
              <div *ngIf="person.get('fullName')?.errors?.['minlength']">Full Name must be at least 5 characters.</div>
            </div>

            <label>Age</label>
            <input type="number" formControlName="age" />
            <div *ngIf="person.get('age')?.invalid && person.get('age')?.touched" class="error">
              <div *ngIf="person.get('age')?.errors?.['required']">Age is required.</div>
              <div *ngIf="person.get('age')?.errors?.['min']">Age must be at least 18 years.</div>
            </div>

          
            <div formArrayName="skills">
              <div *ngFor="let skill of getSkills(i).controls; let j = index">
                <label>Skill</label>
                <input [formControlName]="j" />
                <div *ngIf="skill.invalid && skill.touched" class="error">
                  <div *ngIf="skill.errors?.['required']">Skill is required.</div>
                </div>
                <button type="button" *ngIf="j > 0" (click)="removeSkill(i, j)">Remove Skill</button>
              </div>
              <button type="button" (click)="addSkill(i)">Add Skill</button>
            </div>

           
            <button type="button" (click)="savePerson(i)">Save</button>
          </div>

      
          <div *ngIf="!person.get('isEditing')?.value">
            {{ person.get('fullName')?.value }} ({{ person.get('age')?.value }} years old)
            <ul>
              <li *ngFor="let skill of getSkills(i).controls">{{ skill.value }}</li>
            </ul>
            <button type="button" (click)="editPerson(i)">Edit</button>
            <button type="button" (click)="removePerson(i)">Delete</button>
          </div>
        </li>
      </ul>
    </div>

    <button type="button" (click)="addPerson()">Add Person</button>
    <button type="submit">Save Task</button>
  </form>
</div>