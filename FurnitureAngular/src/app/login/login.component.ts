import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Response } from '../models/response';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users:User = new User;
  formGroup: FormGroup;
  isLogged: boolean

  constructor(private _formBuilder: FormBuilder, private _userService: UserService, private _router: Router) { }


  ngOnInit(): void {
    
    this._userService.getLoggedStatus().subscribe(status => {
      this.isLogged = status;
    });

    if (this._userService.getToken()) this._router.navigateByUrl('/partfurniture/0')

    this.formGroup = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(30)]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]]
    });
  }

  
  login() {
    this._userService.loginUser(this.formGroup.value).subscribe(response => {
      let ResponseApi = response as unknown as Response;
      if (ResponseApi.Success == false) alert(ResponseApi.Message)
      else {
        this._userService.login(ResponseApi.Data);
        this._router.navigateByUrl('/partfurniture/0')
      }
    })
  }



}
