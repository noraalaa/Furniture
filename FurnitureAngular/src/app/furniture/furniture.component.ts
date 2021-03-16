import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response';
import { Furniture } from '../models/furniture';
import { FurnitureService } from '../services/furniture.service';
import { FurnituremethodService } from '../services/furnituremethod.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'




@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css']
})
export class FurnitureComponent implements OnInit {
  furnitures: Furniture[] = [];
  isLoaded:boolean = false;

  constructor(private _furnitureService: FurnitureService, private _furnituremethod : FurnituremethodService,private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._furnitureService.getAllProduct().subscribe(response => {
      let ResponseApi = response as unknown as Response;
      this.furnitures = ResponseApi.Data as Furniture[];
      this.isLoaded = true;
    })

  }

}
