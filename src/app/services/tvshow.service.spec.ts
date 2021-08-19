import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TvshowService } from './tvshow.service';

describe('TvshowService', () => {
  let service: TvshowService;
  let httpTestCtrl : HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers:[TvshowService]
    });
    service = TestBed.inject(TvshowService);
  });
  beforeEach(() => {
    service = TestBed.get(TvshowService);
    httpTestCtrl = TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
