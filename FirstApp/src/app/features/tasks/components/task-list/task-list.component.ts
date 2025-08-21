import { Component,inject} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule,RouterModule],
  providers:[],
  standalone: true
})
export class TaskListComponent {
  private readonly taskService = inject(TaskService);
  readonly tasks = this.taskService.tasks;

  trackById(index: number, task: Task) {
    return task.id;
  }
 
  onDelete(index: number) {
    this.taskService.deleteAtIndex(index);
  }
}