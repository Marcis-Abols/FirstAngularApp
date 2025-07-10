import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly url = 'assets/tasks.json';

  // holds current list
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  // exposes tasks as observable
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    // initial load
    this.http.get<Task[]>(this.url).subscribe(tasks => this.tasksSubject.next(tasks));
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url);
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