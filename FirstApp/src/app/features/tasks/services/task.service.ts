import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { map, take }               from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly url = 'assets/tasks.json';

  // holds current list, will serve as getTasks also
  private readonly _tasks: WritableSignal<Task[]> = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  constructor(private http: HttpClient) {
    // initial load
    this.http.get<Task[]>(this.url).pipe(take(1)).subscribe({
      next: (list) => this._tasks.set(list ?? []),
      error: () => this._tasks.set([]),
    });
  }

  
  // add a new task to the subject
  addTask(task: Omit<Task, 'id'>) {
    this._tasks.update(curr => {
      const nextId = curr.length ? Math.max(...curr.map(t => t.id)) + 1 : 0;
      const newTask: Task = { id: nextId, ...task };
      return [...curr, newTask];
    });
  }

  deleteAtIndex(index: number) {
    this._tasks.update(curr => curr.filter((_, i) => i !== index));
  }

  taskById(id: number) {
    return computed(() => this._tasks().find(t => t.id === id));
  }
}