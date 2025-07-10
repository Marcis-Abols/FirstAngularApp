import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task';
import { TaskList } from './task-list/task-list';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CreateTaskComponent,TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FirstApp1';
}
