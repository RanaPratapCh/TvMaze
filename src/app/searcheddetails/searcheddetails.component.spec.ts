import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TvshowService } from '../services/tvshow.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearcheddetailsComponent } from './searcheddetails.component';
import { of, Subscription } from 'rxjs';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

const sampleData = [{id:'1',name:'flash',language:'english',genre:'Sci-Fi'},
{id:'2',name:'Got',language:'english',genre:'Action'}
];

describe('SearcheddetailsComponent', () => {
  let component: SearcheddetailsComponent;
  let fixture: ComponentFixture<SearcheddetailsComponent>;
  let debugElement : DebugElement;
  let tvShowService : TvshowService;
  let mockList = sampleData;
  let testService = jasmine.createSpyObj('TvshowService', ['getAllShows']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearcheddetailsComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule], 
      providers:[TvshowService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearcheddetailsComponent);
    tvShowService = TestBed.get(TvshowService)
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create product service', () => {
    expect(TvshowService).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should define userSearch', () => {
    expect(component.userSearch).toBeDefined();
  });
  it('should define getUserSearchDetailsSubscription', () => {
    expect(component.getUserSearchDetailsSubscription).toBeDefined();
  });
  it('should instance of subscription getUserSearchDetailsSubscription', () => {
    expect(component.getUserSearchDetailsSubscription).toBeInstanceOf(Subscription);
  });
  it('should define searchResult', () => {
    expect(component.searchResult).toBeDefined();
  });
  it('should define searchDetailsLoading', () => {
    expect(component.searchDetailsLoading).toBeDefined();
  });
  it('should intialize searchDetailsLoading', () => {
    expect(component.searchDetailsLoading).toBeFalse();
  });
  it('should intialize searchDetailsLoading true getSearchDetails', () => {
    component.getSearchDetails();
    expect(component.searchDetailsLoading).toBeTrue();
  });

  it('should define errorSearchDetailsLoading', () => {
    expect(component.errorSearchDetailsLoading).toBeDefined();
  });
  it('should intialize searchDetailsLoading', () => {
    expect(component.errorSearchDetailsLoading).toBeFalse();
  });
  it('should intialize errorSearchDetailsLoading true getSearchDetails', () => {
    component.getSearchDetails();
    expect(component.errorSearchDetailsLoading).toBeFalse();
  });
  
  it('should call ngOnInit', () => {
    spyOn(component,'accessingRouteParameter').and.callThrough();
    component.ngOnInit();
    expect(component.accessingRouteParameter).toHaveBeenCalled();
  });

  it('should call getSearchDetails and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearcheddetailsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"searchShow").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getSearchDetails();
    tick(100);
    expect(component.searchResult).toEqual([]);
  }))

  it('should call getSearchDetails and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(SearcheddetailsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"searchShow").and.callFake(() => {
      return Rx.of([{postId : 100}]).pipe(delay(2000));
    });
    component.getSearchDetails();
    tick(2000);
    expect(component.searchResult).toEqual([{postId : 100}]);
  }))



  it('should unsubscribe the observable life-cycle hook', () => {
    fixture.detectChanges();
    spyOn(component.getUserSearchDetailsSubscription,'unsubscribe');
    component.ngOnDestroy();
    expect(component.getUserSearchDetailsSubscription.unsubscribe).toHaveBeenCalled();
  });
});
