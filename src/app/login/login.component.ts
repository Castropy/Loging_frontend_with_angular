import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Inicialización dentro del constructor
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ingresar() {
    if (this.form.valid) {
      this.http.post('http://localhost:8000/api/auth/login/', this.form.value)
        .subscribe({
          next: (res: any) => {
            // Guardar tokens JWT
            localStorage.setItem('access_token', res.access);
            localStorage.setItem('refresh_token', res.refresh);

            alert('Ingreso exitoso');
            this.router.navigate(['/homepage']);
          },
          error: () => {
            alert('Usuario o contraseña incorrecta');
          }
        });
    }
  }
}
