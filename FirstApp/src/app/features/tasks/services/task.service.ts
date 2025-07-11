import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { take }               from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly url = 'assets/tasks.json';

  // holds current list
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  

  constructor(private http: HttpClient) {
    // initial load
    this.http.get<Task[]>(this.url).pipe(take(1)).subscribe(tasks => this.tasksSubject.next(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }
  // add a new task to the subject
  addTask(task: Task) {
    const current = this.tasksSubject.value;
    this.tasksSubject.next([...current, task]);
  }

  deleteTask(index: number) {
    const current = this.tasksSubject.value;
    const updated = current.filter((_, i) => i !== index);
    this.tasksSubject.next(updated);
  }
}