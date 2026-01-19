import { Component, OnInit, signal, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class Homepage implements OnInit {
  private router = inject(Router);

  showWelcome = signal(true);
  menuAbierto = signal(false);

  ngOnInit(): void {
    setTimeout(() => {
      this.showWelcome.set(false);
    }, 2000);
  }

  toggleMenu() {
    this.menuAbierto.update(v => !v);
  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
  }
}