import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartfurnitureComponent } from './partfurniture.component';

describe('PartfurnitureComponent', () => {
  let component: PartfurnitureComponent;
  let fixture: ComponentFixture<PartfurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartfurnitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartfurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
