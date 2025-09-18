import { Routes } from '@angular/router';
import { TaskListComponent }    from './features/tasks/components/task-list/task-list.component';
import { CreateTaskComponent }  from './features/tasks/components/create-task/create-task.component';
import { HomeComponent } from './features/home/home.component';
import { TaskDetailsComponent } from './features/tasks/components/task-details/task-details.component';

export const routes: Routes = [
  { path: '',             component: HomeComponent      },
  { path: 'tasks',       component: TaskListComponent },
  { path: 'tasks/create',component: CreateTaskComponent },
  { path: 'tasks/:id',     component: TaskDetailsComponent },
  { path: '**',          redirectTo: '',pathMatch: 'full'  }
];
