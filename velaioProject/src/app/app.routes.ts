import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { EditTaskPageComponent } from './pages/edit-task-page/edit-task-page.component';
import { TaskCreatePageComponent } from './pages/task-create/task-create-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-task', component: TaskCreatePageComponent  },
  { path: 'all-tasks', component: TaskListPageComponent },
  { path: 'edit-task/:id', component: EditTaskPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
