import { Component, OnInit } from '@angular/core';
import { Response } from '../models/response';
import { Furniture } from '../models/furniture';
import { FurnitureService } from '../services/furniture.service';
import { FurnituremethodService } from '../services/furnituremethod.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
//import { Observable, Subscribable, NEVER } from 'rxjs'


@Component({
  selector: 'app-partfurniture',
  templateUrl: './partfurniture.component.html',
  styleUrls: ['./partfurniture.component.css']
})
export class PartfurnitureComponent implements OnInit {
  formGroup: FormGroup;
  furnitures: Furniture[] = [];
  isLoaded: boolean = false;
  numberOfPageBegin: number[] = [];
  indexLink: number[] = []
  skip: number = 0;

  constructor(private _furnitureService: FurnitureService, private _furnituremethod: FurnituremethodService, private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this._furnitureService.getCountProduct().subscribe(response => {
      let ResponseApi = response as Response;
      let responseData = ResponseApi.Data ;
      var numberOfPage = Math.ceil(responseData / 10);
      for (let i = 0; i < numberOfPage; i++) {
        this.numberOfPageBegin[i] = i * 10;
      }
    });

    this._activatedRoute.paramMap.subscribe(params => {

      this.skip = + (params.get('skip') as string) ;
      this.indexLink = [this.skip - 1, this.skip + 1];

      this._furnitureService.getPartProduct(this.numberOfPageBegin[this.skip]).subscribe(response => {
        let ResponseApi = response as Response;
        this.furnitures = ResponseApi.Data as Furniture[];
        this.isLoaded = true;
      })
    })



  }







}

