import { Component, OnInit, Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() logOut = new EventEmitter<any>(); 
  constructor() { }

  ngOnInit(): void {
  }

  public logout(){
    this.logOut.emit();
  }
}
