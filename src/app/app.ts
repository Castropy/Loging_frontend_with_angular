import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogginComponent } from './loggin/loggin.component';
  // 👈 importa tu componente

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LogginComponent],  // 👈 agrégalo aquí
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('mi-primer-proyecto');
}
