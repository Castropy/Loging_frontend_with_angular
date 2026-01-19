import { Component } from '@angular/core'; //Componente autonomo (standalone)
import { RouterModule, Router } from '@angular/router'; //Import para navegar entre vistas
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms'; //Import para el manejo avanzado de formularios
import { HttpClient } from '@angular/common/http'; //Import para peticiones http al servidor 

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
      username: ['', Validators.required], //Campo de entrada de usuario requerido
      password: ['', Validators.required]  //Campo de entrada de clave requerido
    });
  }

  ingresar() {
    if (this.form.valid) { //Si el formulario cumple con las condiciones 
      this.http.post('http://localhost:8000/api/auth/login/', this.form.value) 
      /*Envia una peticion http tipo POST a una api 'http://localhost:8000/api/auth/login/'
      con los datos capturados en el formulario, es decir usuario y clave.
      */      
        .subscribe({ /*Si la respuesta del servidor es correcta el codigo extrae
          los tokens JWT (acces y refresh)*/
          next: (res: any) => {
            // Guardar tokens JWT en local storage del navegador 
            localStorage.setItem('access_token', res.access);
            localStorage.setItem('refresh_token', res.refresh);

            
            this.router.navigate(['/homepage']);
            /*Finalmente despues de validar los campos de entrada
            y guardar los tokens, ahora la vista se redirige hacia 
            el componente homepage*/
          },
          error: () => { //En caso de error en el formulario arroja un alert
            alert('Usuario o contraseña incorrecta');
          }
        });
    } 
  }
}
