  import { Component } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  gender: string = '';
  termos: string = '';

  constructor() { }

  register() {
    // Simulação do processo de registro
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('Gender: '), this.gender;
    console.log('Termos: '), this.termos;

    // Limpar os campos do formulário após o registro
    this.username = '';
    this.email = '';
    this.password = '';
    this.gender = '';
    this.termos = '';
  }
}
