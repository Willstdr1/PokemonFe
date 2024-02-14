import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gotta Catch Em All';

  constructor(private auth: AuthService) { }

  login(islogged: boolean) {
    if (islogged) {
      this.auth.login();
    }
    else {
      this.auth.logout();
    }
  }

}
