import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged:boolean
  constructor(private _userService:UserService) { }

  ngOnInit(): void {
    if (this._userService.getToken()) this.isLogged = true;
    this._userService.getLoggedStatus().subscribe(status=>{
      this.isLogged = status;
    });  
  }

}
