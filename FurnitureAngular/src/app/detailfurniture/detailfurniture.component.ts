import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response';
import { Furniture } from '../models/furniture';
import { FurnitureService } from '../services/furniture.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailfurniture',
  templateUrl: './detailfurniture.component.html',
  styleUrls: ['./detailfurniture.component.css']
})
export class DetailfurnitureComponent implements OnInit {

  furnitures:Furniture  = new Furniture;
  isLoaded:boolean = false;

  constructor(private _furnitureService: FurnitureService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
    this._activatedRoute.paramMap.subscribe(params=>{

      var id = +(params.get('id') as string );
      
      this._furnitureService.getProductById(id).subscribe(response => {
        let ResponseApi = response as Response;
        this.furnitures = ResponseApi.Data as Furniture;  
      })
      this.isLoaded = true;    

  })

}
}
