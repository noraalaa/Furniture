import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailfurnitureComponent } from './detailfurniture.component';

describe('DetailfurnitureComponent', () => {
  let component: DetailfurnitureComponent;
  let fixture: ComponentFixture<DetailfurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailfurnitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailfurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
