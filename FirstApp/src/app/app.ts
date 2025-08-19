import { Component } from '@angular/core';
import { RouterOutlet, RouterLink} from '@angular/router';
import { TasksFeatureModule } from './features/tasks/tasks-feature-module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TasksFeatureModule,RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FirstApp1';
}
