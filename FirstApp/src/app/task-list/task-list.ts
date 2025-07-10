import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task';
import { Task } from '../models/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  imports: [CommonModule],
  providers:[]
})
export class TaskList implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe(data => this.tasks = data);
  }

  onDelete(index: number): void {
    this.taskService.deleteTask(index);
  }
}