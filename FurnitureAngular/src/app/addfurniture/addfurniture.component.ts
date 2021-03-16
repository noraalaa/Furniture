import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response';
import { Furniture } from '../models/furniture';
import { FurnitureService } from '../services/furniture.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-addfurniture',
  templateUrl: './addfurniture.component.html',
  styleUrls: ['./addfurniture.component.css']
})
export class AddfurnitureComponent implements OnInit {
  furnitures: Furniture[] = [];
  formGroup: FormGroup;

  constructor(private _furnitureService: FurnitureService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      //,Validators.pattern('([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)')
      //jpg or jpeg or png or gif or bmp
      Image: ['', [Validators.required, Validators.pattern('[a-z]*\.(.*?)\.(jpg|bmp|gif|png|jpeg)$')]],
      Description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      Collection: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      // //,Validators.pattern('[0-9]*')
      Price: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern('[0-9]*')]]
    });
  }


  addProduct() {
    let furniture = new Furniture;
    furniture = this.formGroup.value;
    this._furnitureService.createProduct(furniture).subscribe(response => {
      let ResponseApi = response as Response;
      if (ResponseApi.Success == false) {
        alert(ResponseApi.Message)
      }
      else
        this.furnitures.unshift(furniture);
      alert(ResponseApi.Message)
    });

  }

}
