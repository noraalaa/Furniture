import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchfurnitureComponent } from './searchfurniture.component';

describe('SearchfurnitureComponent', () => {
  let component: SearchfurnitureComponent;
  let fixture: ComponentFixture<SearchfurnitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchfurnitureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchfurnitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
