import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class Homepage implements OnInit {
  // Controla qué vista se muestra
  showWelcome: boolean = true;

  ngOnInit(): void {
    // Después de 2000ms (2 segundos), cambiamos el estado
    setTimeout(() => {
      this.showWelcome = false;
      console.log('Cambiando a contenido principal...');
    }, 2000);
  }
}