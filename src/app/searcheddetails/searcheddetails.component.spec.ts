import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcheddetailsComponent } from './searcheddetails.component';

describe('SearcheddetailsComponent', () => {
  let component: SearcheddetailsComponent;
  let fixture: ComponentFixture<SearcheddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearcheddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcheddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
