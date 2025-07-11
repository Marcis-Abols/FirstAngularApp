import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksFeatureModule } from './tasks-feature/tasks-feature-module';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TasksFeatureModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FirstApp1';
}
