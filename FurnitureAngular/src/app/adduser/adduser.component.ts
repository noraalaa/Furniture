import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Response } from '../models/response';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  users:User[]=[];
  formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,private _userService:UserService, private _router:Router) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      Email: ['', [Validators.required, Validators.email,]],
      Password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      Gender: ['', [Validators.required]],
      MilitaryService:['', [Validators.required]],
      DateOfBirth: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]]
    });
  }

  addUser() {
    let user = new User;
    user = this.formGroup.value;
    this._userService.createUser(user).subscribe(response => {
      let ResponseApi = response as Response;
      if (ResponseApi.Success == false) {
        alert(ResponseApi.Message)
      }
      else
        this.users.unshift(user);
        this._userService.login(ResponseApi.Data);
        this._router.navigateByUrl('/partfurniture/0')
      alert(ResponseApi.Message)
    });

  }





}




