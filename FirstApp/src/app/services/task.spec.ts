// src/app/services/task.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TaskService } from './task';
import { Task } from '../models/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks from JSON', (done) => {
    const dummyTasks: Task[] = [
      { title: 'Test', description: 'Desc', type: 'Feature', createdOn: new Date(), status: 'Pending' }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks).toEqual(dummyTasks);
      done();
    });

    const req = httpMock.expectOne('assets/tasks.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });
});