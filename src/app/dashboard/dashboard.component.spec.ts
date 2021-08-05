import { Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription } from 'rxjs';
import { TvshowService } from '../services/tvshow.service';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

import { DashboardComponent } from './dashboard.component';

    const sampleData = [{id:'1',name:'flash',language:'english',genre:'Sci-Fi'},
                        {id:'2',name:'Got',language:'english',genre:'Action'}
  ];
describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let testService = jasmine.createSpyObj('TvshowService', ['getAllShows']);
  let mockList = sampleData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule], 
      providers:[TvshowService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    testService = TestBed.get(TvshowService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define allshows', () => {
    expect(component.allShows).toBeDefined();
  });
  it('should define topShows', () => {
    expect(component.topShows).toBeDefined();
  });
  it('should define dramaShows', () => {
    expect(component.dramaShows).toBeDefined();
  });
  it('should define comedyShows', () => {
    expect(component.comedyShows).toBeDefined();
  });
  it('should define getallShowsSubscription', () => {
    expect(component.getallShowsSubscription).toBeDefined();
  });
  it('should instance of subscription getallShowsSubscription', () => {
    expect(component.getallShowsSubscription).toBeInstanceOf(Subscription);
  });
  it('should define dashboardLoading', () => {
    expect(component.dashboardLoading).toBeDefined();
  });
  it('should intialize dashboardLoading', () => {
    expect(component.dashboardLoading).toBeTrue();
  });
  it('should intialize dashboardLoading true inside getAllShowsAndDetails', () => {
    component.getAllShowsAndDetails();
    expect(component.dashboardLoading).toBeTrue();
  });

  it('should define errorDashboardLoading', () => {
    expect(component.errorDashboardLoading).toBeDefined();
  });
  it('should intialize dashboardLoading', () => {
    expect(component.errorDashboardLoading).toBeFalse();
  });
  it('should intialize dashboardLoading true inside getAllShowsAndDetails', () => {
    component.getAllShowsAndDetails();
    expect(component.errorDashboardLoading).toBeFalse();
  });

  it('should call ngOnInit', () => {
    spyOn(component,'getAllShowsAndDetails').and.callThrough();
    component.ngOnInit();
    expect(component.getAllShowsAndDetails).toHaveBeenCalled();
  });

  it('should call get all shows and details with subscribe', fakeAsync(() => {
    let serviceSpy = spyOn(testService,'getAllShows').and.returnValue(of(mockList));
    let subscribeSpy = spyOn(testService.getAllShows(),'subscribe');
    component.getAllShowsAndDetails();
    tick();
    expect(serviceSpy).toHaveBeenCalledBefore(subscribeSpy)
    expect(subscribeSpy).toHaveBeenCalled();

  }));
  it('should call getAllShowsAndDetails and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"getAllShows").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getAllShowsAndDetails();
    tick(100);
    expect(component.allShows).toEqual([]);
  }))
  it('should call getPostDetails and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"getAllShows").and.callFake(() => {
      return Rx.of([{postId : 100}]).pipe(delay(2000));
    });
    component.getAllShowsAndDetails();
    tick(2000);
    expect(component.allShows).toEqual([{postId : 100}]);
  }))
  it('should call getPostDetails and get response as array length', fakeAsync(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"getAllShows").and.callFake(() => {
      return Rx.of([{postId : 100}]).pipe(delay(2000));
    });
    component.getAllShowsAndDetails();
    tick(2000);
    expect(component.allShows.length).toBeGreaterThan(0);
  }))
  it('should call getPostDetails and get topShows length', fakeAsync(() => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"getAllShows").and.callFake(() => {
      return Rx.of([{postId : 100}]).pipe(delay(2000));
    });
    component.getAllShowsAndDetails();
    tick(2000);
    expect(component.topShows.length).toBeGreaterThan(0);
  }))



  it('should Test ngOnDestroy life-cycle hook', () => {
    fixture.detectChanges();
    spyOn(component.getallShowsSubscription,'unsubscribe');
    component.ngOnDestroy();
    expect(component.getallShowsSubscription.unsubscribe).toHaveBeenCalled();
  });

});
