import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'create-task', component: TaskFormComponent },
  { path: 'all-tasks', component: TaskListPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
