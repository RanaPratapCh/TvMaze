import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TvshowService } from '../services/tvshow.service';

@Component({
  selector: 'app-showdetails',
  templateUrl: './showdetails.component.html',
  styleUrls: ['./showdetails.component.scss']
})
export class ShowdetailsComponent implements OnInit,OnDestroy {

  showDetailsId = 0;
  showDetailsSubscription: Subscription = new Subscription;
  showData:any="";
  showDetailsLoading = false;
  errorShowDetailsLoading = false;

  constructor(private activeRoute:ActivatedRoute,private tvShows:TvshowService) { }

  ngOnInit(): void {
    this.accessingRouteParameter();
  }
  accessingRouteParameter(){
    this.activeRoute.params.forEach((params: Params)=>{
      if(params['id'] !== undefined){
        this.showDetailsId = params['id'];
        this.getShowDetailsData();
      }else{
        this.showDetailsId = 0;
      }
    });
  }
  getShowDetailsData(){
    this.showDetailsLoading = true;
    this.errorShowDetailsLoading = false;
    this.showDetailsSubscription = this.tvShows.getShowDetails(this.showDetailsId).subscribe((data)=>{
      try{
        this.showDetailsLoading = false;
        this.errorShowDetailsLoading = false;
        this.showData = data;
      }catch(e){
        this.showDetailsLoading = false;
        this.errorShowDetailsLoading = true;
      }
    },error =>{
      this.showDetailsLoading = false;
      this.errorShowDetailsLoading = true;
    });
  }
  ngOnDestroy(){
    if(this.showDetailsSubscription)
      this.showDetailsSubscription.unsubscribe();
  }

}
