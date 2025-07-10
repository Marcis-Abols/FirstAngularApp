//create-task.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task';
import { TaskService } from '../services/task';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css'
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup;
  // Dropdown options for type and status fields
  types = ['Feature', 'Bug', 'Improvement'];
  statuses = ['Pending', 'In Progress', 'Completed'];

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
     // Initialize form controls for each Task property
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      type: [this.types[0], Validators.required],
      createdOn: [new Date().toISOString().substring(0, 10), Validators.required],
      status: [this.statuses[0], Validators.required]
    });
  }

  // Called when the form is submitted
  addTask(): void {
    if (this.taskForm.valid) {
      // Build a Task object, parsing date string into a Date
      const formValue = this.taskForm.value;
      const newTask: Task = {
        title: formValue.title,
        description: formValue.description,
        type: formValue.type,
        createdOn: new Date(formValue.createdOn),
        status: formValue.status
      };
      console.log('New Task:', newTask);
      // push new task into service
      this.taskService.addTask(newTask);

      // Reset form, preserving default selections and date
      this.taskForm.reset({
        title: '',
        description: '',
        type: this.types[0],
        createdOn: new Date().toISOString().substring(0, 10),
        status: this.statuses[0]
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
