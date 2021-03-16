import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users:User[]=[];

  constructor(private _httpClient:HttpClient, private _userService:UserService) { }

  ngOnInit(): void {
    this._userService.getAllUser().subscribe( response => {
      let ResponseApi = response as unknown  as Response;
      this.users = ResponseApi.Data as User[];
   })
  }





  // userById:any;
  // getUserById(code:number){
  //   this._userService.getUserById(code).subscribe( response =>{
  //     let ResponseApi = response as Response;
  //     if(ResponseApi.Success==false){
  //       this.userById = null;
  //       alert(ResponseApi.Message)
  //     }
  //     else
  //     this.userById = ResponseApi.Data as User[];
  //   })
  // }



  // deleteUser(index:number){
  //   let userCode=this.users[index].code;
  //   this._userService.deleteUser(userCode).subscribe(response =>{
  //     let ResponseApi = response as Response;
  //     if(ResponseApi.Success == false){
  //       alert(ResponseApi.Message)
  //     }
  //     else
  //     this.users.splice(index,1);
  //   });
  // }




  // getIndexToupdate:number;
  // updateUser(name:string,email:string,password:string){
  //   let userCode = this.users[this.getIndexToupdate].code;
  //   let user = new User;
  //   user.code = userCode;
  //   user.name = name;
  //   user.email = email;
  //   user.password = password;
  //   this._userService.updateUser(userCode,user).subscribe(response =>{
  //     let ResponseApi = response as Response;
  //     if(ResponseApi.Success == false){
  //       alert(ResponseApi.Message)
  //     }
  //     else
  //     this.users[this.getIndexToupdate] = user
  //   });
  // }
  // getIndex(index:number){
  //   this.getIndexToupdate = index ;
  // }




}





// <!-- LIST OF USERS -->
// <div class="container m-5">
//     <h1 style="text-align: center;">Get ALL USERS</h1>
//     <h2>User Data</h2>
//     <table class="table">
//         <thead>
//             <tr>
//                 <th>Index</th>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Password</th>
//                 <th>Update</th>
//                 <th>Delete</th>
//             </tr>

//         </thead>
//         <tbody>
//             <tr *ngFor="let user of users; let currentIndex = index;">
//                 <td>{{currentIndex+1}}</td>
//                 <td>{{user.ID}}</td>
//                 <td>{{user.Name}}</td>
//                 <td>{{user.Email}}</td>
//                 <td>{{user.Password}}</td>
//                 <td>
//                     <!-- Button to Open the Modal -->
//                     <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal"
//                         (click)="getIndex(currentIndex)">
//                         Update
//                     </button>
//                     <!-- Update data -->

//                 </td>
//                 <td>
//                     <button type="button" class="btn btn-danger" (click)='deleteUser(currentIndex)'>Delete</button>
//                 </td>
//             </tr>

//         </tbody>
//     </table>
// </div>
// <hr>


// <!-- GET USER BY ID -->
// <div class="form-group m-5">
//     <h1 style="text-align: center;">GET USER BY ID</h1>
//     <label for="getcode">code:</label>
//     <input type="text" #inputgetcode class="form-control" id="getcode" placeholder="write code">
//     <br>
//     <button type="button" class="btn btn-primary" (click)='getUserById(+inputgetcode.value);
//     inputgetcode.value=""; '>Get User By ID</button>
//     <table class="table" *ngIf=" userById != null">
//         <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>name</th>
//                 <th>email</th>
//                 <th>password</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr>
//                 <td>{{userById.code}}</td>
//                 <td>{{userById.name}}</td>
//                 <td>{{userById.email}}</td>
//                 <td>{{userById.password}}</td>
//             </tr>
//         </tbody>
//     </table>
// </div>

// <!-- The Modal -->
// <div class="modal fade" id="myModal" *ngIf="getIndexToupdate>=0">
//     <div class="modal-dialog">
//         <div class="modal-content">

//             <!-- Modal Header -->
//             <div class="modal-header">
//                 <h4 class="modal-title">Update user </h4>
//                 <button type="button" class="close" data-dismiss="modal">&times;</button>
//             </div>

//             <!-- Modal body -->
//             <div class="modal-body">

//                 <label for="updateusr">name:</label>
//                 <input type="text" #inputupdatename [value]="users[getIndexToupdate].name" class="form-control"
//                     id="updateusr">

//                 <label for="updatelusr">mail:</label>
//                 <input type="text" #inpuupdatetmail [value]="users[getIndexToupdate].email" class="form-control"
//                     id="updatelusr">

//                 <label for="updateAge">password:</label>
//                 <input type="text" #inputupdatepassword [value]="users[getIndexToupdate].password" class="form-control"
//                     id="updateAge">

//             </div>

//             <!-- Modal footer -->
//             <div class="modal-footer">
//                 <button type="button" class="btn btn-danger" data-dismiss="modal" (click)='updateUser(inputupdatename.value,inpuupdatetmail.value,inputupdatepassword.value);
//                                      '>Update</button>
//             </div>

//         </div>
//     </div>
// </div>