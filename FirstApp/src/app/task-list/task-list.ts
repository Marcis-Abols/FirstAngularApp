import { Component} from '@angular/core';
import { TaskService } from '../services/task';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../models/task';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  imports: [CommonModule],
  providers:[]
})
export class TaskList{
  tasks$: Observable<Task[]>

  constructor(private taskService: TaskService) {
     this.tasks$= this.taskService.getTasks();
  }

 
  onDelete(index: number): void {
    this.taskService.deleteTask(index);
  }
}