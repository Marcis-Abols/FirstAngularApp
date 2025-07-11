import { Component} from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [CommonModule],
  providers:[]
})
export class TaskListComponent {
  tasks$: Observable<Task[]>

  constructor(private taskService: TaskService) {
     this.tasks$= this.taskService.getTasks();
  }

 
  onDelete(index: number): void {
    this.taskService.deleteTask(index);
  }
}