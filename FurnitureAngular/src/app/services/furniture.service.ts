import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private _apiService:ApiService) { }

  getAllProduct(){
    return this._apiService.get("furniturer")
  }

  getProductById(id:number){
    return this._apiService.getByID("furniturer",id)
  }

  createProduct(body:any){
    return this._apiService.post("furniturer",body)
  }

  deleteProduct(id:number){
    return this._apiService.delete("furniturer",id)
  }

  updateProduct(id:number,body:any){
    return this._apiService.put("furniturer",id,body)
  }

  searchProduct(price:number,word:string){
    return this._apiService.search("furniturer",price,word)
  }

  getPartProduct(skip:number){
    return this._apiService.getPart("furniturer",skip)
  }
  
  getCountProduct(){
    return this._apiService.getCount("furniturer")
  }


}
