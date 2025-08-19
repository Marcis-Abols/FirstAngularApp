import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { map, take }               from 'rxjs/operators';
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
  addTask(task: Omit<Task,'id'>): Task {
    const current = this.tasksSubject.value;
    const maxId  = current.length? Math.max(...current.map(t => t.id)): 0;
    const withId: Task = { ...task, id: maxId + 1 };
    this.tasksSubject.next([...current, withId]);
    return withId;
  }

  deleteTask(index: number) {
    const current = this.tasksSubject.value;
    const updated = current.filter((_, i) => i !== index);
    this.tasksSubject.next(updated);
  }

  getTaskById(id: number): Observable<Task|undefined> {
    return this.tasksSubject.asObservable().pipe(
      map(tasks => tasks.find(t => t.id === id))
    );
  }
}