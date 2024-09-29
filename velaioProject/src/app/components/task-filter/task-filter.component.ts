import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css'],
})
export class TaskFilterComponent {

  @Output() filterChanged = new EventEmitter<string>();
  activeFilter: string = 'all';


  setFilter(filter: string) {
    this.filterChanged.emit(filter);
    this.activeFilter = filter;
    
  }
}
