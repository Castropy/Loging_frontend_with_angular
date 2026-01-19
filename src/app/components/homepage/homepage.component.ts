import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [], // Con @if no necesitas CommonModule
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class Homepage implements OnInit {
  
  // 1. Definimos una Signal con el valor inicial 'true'
  showWelcome = signal(true);

  ngOnInit(): void {
    setTimeout(() => {
      // 2. Cambiamos el valor de la Signal usando .set()
      this.showWelcome.set(false);
    }, 2000);
  }
}