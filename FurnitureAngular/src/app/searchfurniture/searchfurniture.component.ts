import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response';
import { Furniture } from '../models/furniture';
import { FurnitureService } from '../services/furniture.service';
import { FurnituremethodService } from '../services/furnituremethod.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-searchfurniture',
  templateUrl: './searchfurniture.component.html',
  styleUrls: ['./searchfurniture.component.css']
})
export class SearchfurnitureComponent implements OnInit {
  formGroup: FormGroup;
  furnitures: Furniture[] = [];
  selectedPrice:number = 0;
  isLoaded:boolean = true;
  messageFromMongo:string
  constructor(private _furnitureService: FurnitureService, private _furnituremethod: FurnituremethodService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  searchProduct(search:string){
    this.isLoaded = false;
    this._furnitureService.searchProduct(this.selectedPrice,search).subscribe(response => {
      let ResponseApi = response as Response;
      if (ResponseApi.Success == false){
        this.messageFromMongo = ResponseApi.Message ; 
        this.furnitures = [];
      }
      else{
        this.furnitures = ResponseApi.Data as Furniture[];
        this.messageFromMongo="";
      }
      this.isLoaded = true;

    });
  }

}
