import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('name') nameKey!: ElementRef;
  @ViewChild('email') mailKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  user(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
    localStorage.setItem("email",this.mailKey.nativeElement.value);
  }
}
