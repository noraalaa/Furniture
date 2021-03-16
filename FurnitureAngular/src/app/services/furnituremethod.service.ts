import { Injectable } from '@angular/core';
import { Furniture } from '../models/furniture';
import { FurnitureService } from '../services/furniture.service';
import { Response } from '../models/response';


@Injectable({
  providedIn: 'root'
})
export class FurnituremethodService {

  constructor(private _furnitureService: FurnitureService) { }

  deleteProductmethod(index: number,furnitures:Furniture[]) {
    var ID = furnitures[index].ID;
    this._furnitureService.deleteProduct(ID).subscribe(response => {
      let ResponseApi = response as Response;
      if (ResponseApi.Success == false) {
        alert(ResponseApi.Message)
      }
      else {
        furnitures.splice(index, 1);
      }
    })
  }



  updateProductmethod(ID:number,furniture:any,furnitures:Furniture[],getIndexToupdate:number) {
    this._furnitureService.updateProduct(ID, furniture).subscribe(response=> {
      let ResponseApi = response as Response;
      if (ResponseApi.Success == false) {
        alert(ResponseApi.Message)
      }
      else
        furnitures[getIndexToupdate] = furniture;
    });
  }



}
