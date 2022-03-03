import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import {} from '@angular/forms'
import { AuthService } from 'src/app/Shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  @ViewChild("name") namekey!:ElementRef;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    localStorage.setItem("name",this.namekey.nativeElement.value);
    if(this.email==''){
      alert('Please Enter email!');
      return;
    }
    if(this.password==''){
      alert('Please Enter Password!');
      return;
    }
    this.auth.login(this.email,this.password);
    this.email='';
    this.password='';
  }
}
