//create-task.ts
import { Component} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task';
import { TaskService } from '../services/task';

@Component({
  selector: 'app-create-task',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css'
})
export class CreateTaskComponent {
   
  // initialize form on declaration to avoid non-null assertion
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.required],
      type: [this.types[0], Validators.required],
      createdOn: [new Date().toISOString().substring(0, 10), Validators.required],
      status: [this.statuses[0], Validators.required]
    });
  }

  // Dropdown options for type and status fields
  types = ['Feature', 'Bug', 'Improvement'];
  statuses = ['Pending', 'In Progress', 'Completed'];

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
