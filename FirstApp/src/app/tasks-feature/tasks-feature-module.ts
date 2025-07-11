import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';
import { CreateTaskComponent }    from './create-task/create-task';
import { TaskListComponent }      from './task-list/task-list';



@NgModule({
  declarations: [],
  imports: [CommonModule,ReactiveFormsModule,CreateTaskComponent,TaskListComponent],
  exports: [CreateTaskComponent,TaskListComponent]
})
export class TasksFeatureModule { }
