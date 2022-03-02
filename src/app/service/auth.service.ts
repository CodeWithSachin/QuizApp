import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }
// logIn Method
  login(email:string, password:string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(()=>{
      localStorage.setItem('token','true');
      this.router.navigate(['./welcome'])
    }, err =>{
      alert('Something went Wrong');
      this.router.navigate(['./login'])
    })
  }
  // SignUp Method
  register(email:string, password:string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(()=>{
      alert('registration Succesful');
      this.router.navigate(['./login'])
    },err=>{
      alert(err.message);
      this.router.navigate(['./register'])
    })
  }

}
