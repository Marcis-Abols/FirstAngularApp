import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';
import { CreateTaskComponent }    from '../tasks/components/create-task/create-task.component';
import { TaskListComponent }      from '../tasks/components/task-list/task-list.component';



@NgModule({
  declarations: [],
  imports: [CommonModule,ReactiveFormsModule,CreateTaskComponent,TaskListComponent],
  exports: [CreateTaskComponent,TaskListComponent]
})
export class TasksFeatureModule { }
