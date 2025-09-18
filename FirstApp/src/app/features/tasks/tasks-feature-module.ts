import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';
import { CreateTaskComponent }    from '../tasks/components/create-task/create-task.component';
import { TaskListComponent }      from '../tasks/components/task-list/task-list.component';
import { TaskDetailsComponent } from '../tasks/components/task-details/task-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [CommonModule,ReactiveFormsModule,CreateTaskComponent,TaskListComponent,TaskDetailsComponent,RouterModule],
  exports: [CreateTaskComponent,TaskListComponent]
})
export class TasksFeatureModule { }
