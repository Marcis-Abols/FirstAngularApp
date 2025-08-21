import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map} from 'rxjs/operators';
import { TaskService }   from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);

  readonly taskId = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id')))),
    { initialValue: NaN }
  );
  
  readonly task = computed(() => {
    const id = this.taskId();
    if (Number.isNaN(id)) return undefined;
    // taskById returns a computed signal—read it with ()
    return this.taskService.taskById(id)();
  });
}
