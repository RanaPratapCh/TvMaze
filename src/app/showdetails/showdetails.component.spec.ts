import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Subscription } from 'rxjs';
import { TvshowService } from '../services/tvshow.service';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";

import { ShowdetailsComponent } from './showdetails.component';

describe('ShowdetailsComponent', () => {
  let component: ShowdetailsComponent;
  let fixture: ComponentFixture<ShowdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowdetailsComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule], 
      providers:[TvshowService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should define showDetailsId', () => {
    expect(component.showDetailsId).toBeDefined();
  });
  it('should define showData', () => {
    expect(component.showData).toBeDefined();
  });
  it('should define showDetailsSubscription', () => {
    expect(component.showDetailsSubscription).toBeDefined();
  });
  it('should define showDetailsSubscription', () => {
    expect(component.showDetailsSubscription).toBeInstanceOf(Subscription);
  });

  it('should define showDetailsLoading', () => {
    expect(component.showDetailsLoading).toBeDefined();
  });
  it('should define showDetailsLoading', () => {
    expect(component.showDetailsLoading).toBeFalse();
  });

  it('should intialize showDetailsLoading true getShowDetailsData', () => {
    component.getShowDetailsData();
    expect(component.showDetailsLoading).toBeTrue();
  });

  it('should call getSearchDetails and get response as empty array', fakeAsync(() => {
    const fixture = TestBed.createComponent(ShowdetailsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"getShowDetails").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });
    component.getShowDetailsData();
    tick(100);
    expect(component.showData).toEqual([]);
  }))

  it('should call getSearchDetails and get response as array', fakeAsync(() => {
    const fixture = TestBed.createComponent(ShowdetailsComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(TvshowService);
    let spy_getPosts = spyOn(service,"getShowDetails").and.callFake(() => {
      return Rx.of([{postId : 100}]).pipe(delay(2000));
    });
    component.getShowDetailsData();
    tick(2000);
    expect(component.showData).toEqual([{postId : 100}]);
  }))

  it('should Test ngOnDestroy life-cycle hook to unsbscribe the observable', () => {
    fixture.detectChanges();
    spyOn(component.showDetailsSubscription,'unsubscribe');
    component.ngOnDestroy();
    expect(component.showDetailsSubscription.unsubscribe).toHaveBeenCalled();
  });
});
