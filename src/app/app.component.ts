import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demo1';
  userValid = false;
  showForm = true;

  goToDashboard(){
    this.userValid = true;
    this.showForm = false;
  }

  logout(){
    this.userValid = false;
    this.showForm = true;
  }
}
