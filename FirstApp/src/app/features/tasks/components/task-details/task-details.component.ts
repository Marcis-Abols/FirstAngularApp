import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable }    from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Task }          from '../../models/task.model';
import { TaskService }   from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  task$: Observable<Task | undefined>;
  constructor(
    private route: ActivatedRoute,
    private tasks: TaskService
  ) {
    this.task$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.tasks.getTaskById(id))
    );
  }
}
