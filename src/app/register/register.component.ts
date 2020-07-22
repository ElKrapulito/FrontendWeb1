import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  profileForm = this.fb.group({
    fullName:['', Validators.required],
    lastName: ['', Validators.required],
    email: ['',[Validators.email,Validators.required]],
    pass: ['', Validators.required],
    pass2: ['', Validators.required],
    isAdmin: [false]
  });

  user:User;
  onSubmit(){
    const values = this.profileForm.value;
    if(values.pass != values.pass2){
      alert('Contraseñas no coinciden!');
      return;
    }
    this.user = {
      fullName: values.fullName,
      lastName: values.lastName,
      email: values.email,
      password: values.pass,
      admin: values.isAdmin
    }
    this.userService.registerUser(this.user).subscribe( _ =>
      this.router.navigate(['/login'])
    );
  }

}
