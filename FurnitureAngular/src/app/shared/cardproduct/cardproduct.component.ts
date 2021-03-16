import { Component, Input, OnInit } from '@angular/core';
import { Furniture } from 'src/app//models/furniture';
import { FurnituremethodService } from 'src/app//services/furnituremethod.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FurnitureService } from 'src/app/services/furniture.service';

@Component({
  selector: 'app-cardproduct',
  templateUrl: './cardproduct.component.html',
  styleUrls: ['./cardproduct.component.css']
})
export class CardproductComponent implements OnInit {
  formGroup: FormGroup;
  @Input() furnitures: Furniture[] = [];
  @Input() isLoaded: boolean = false;



  constructor(private _furnitureService: FurnitureService, private _furnituremethod: FurnituremethodService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      Name: new FormControl(),
      Image: new FormControl(),
      Description: new FormControl(),
      Collection: new FormControl(),
      Price: new FormControl()

    });
    this.formGroup = this._formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      //,Validators.pattern('([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)')
      //jpg or jpeg or png or gif or bmp
      Image: ['', [Validators.required, Validators.pattern('[a-z]*\.(.*?)\.(jpg|bmp|gif|png|jpeg)$')]],
      Description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
      Collection: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      // //,Validators.pattern('[0-9]*')
      Price: [, [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern('[0-9]*')]]
    });
  }

  deleteProduct(index: number) {
    this.furnitures[index].isDeleting = true;
    this._furnituremethod.deleteProductmethod(index, this.furnitures);
    this.furnitures[index].isDeleting = false;

  }


  getIndexToupdate: number;
  updateProduct(id: number) {
    let furniture = new Furniture;
    furniture = this.formGroup.value;
    furniture.ID = id;
    this.furnitures[this.getIndexToupdate].isUpdating = true;
    this._furnituremethod.updateProductmethod(id, furniture, this.furnitures, this.getIndexToupdate);
    this.furnitures[this.getIndexToupdate].isUpdating = false;
  }
  getIndex(index: number) {
    this.getIndexToupdate = index;
    this.formGroup.setValue({ Name: this.furnitures[index].Name, Image: this.furnitures[index].Image, Description: this.furnitures[index].Description, Collection: this.furnitures[index].Collection, Price: this.furnitures[index].Price })
  }



}
