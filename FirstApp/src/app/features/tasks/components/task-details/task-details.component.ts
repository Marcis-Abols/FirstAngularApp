import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map} from 'rxjs/operators';
import { TaskService }   from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);
  private readonly fb = inject(FormBuilder);

  readonly taskId = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id')))),
    { initialValue: null }
  );
  
  readonly task = computed(() => {
    const id = this.taskId();
    if (id==null) return ;
    // taskById returns a computed signal—read it with ()
    return this.taskService.taskById(id)();
  });

  readonly isEditMode = signal(false);
  editForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    type: ['', Validators.required],
    status: ['', Validators.required]
  });

  toggleEditMode() {
    const currentTask = this.task();
    if (!currentTask) return;

    if (!this.isEditMode()) {
      // Entering edit mode - populate form with current task data
      this.editForm.patchValue({
        title: currentTask.title,
        description: currentTask.description,
        type: currentTask.type,
        status: currentTask.status
      });
      this.isEditMode.set(true);
    } else {
      // Exiting edit mode without saving
      this.isEditMode.set(false);
    }
  }

  saveTask() {
    if (this.editForm.valid) {
      const currentTask = this.task();
      if (!currentTask) return;

      const updatedTask: Task = {
        ...currentTask,
        ...this.editForm.value
      };

      this.taskService.updateTask(updatedTask);
      this.isEditMode.set(false);
    }
  }

  cancelEdit() {
    this.isEditMode.set(false);
  }
}
