import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TvshowService } from '../services/tvshow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  allShows:any = "";
  topShows:any = "";
  dramaShows:any = "";;
  comedyShows:any = "";;
  getallShowsSubscription: Subscription = new Subscription;
  dashboardLoading = false;
  constructor(public Tvshows:TvshowService) { }

  ngOnInit(): void {
    this.getAllShowsAndDetails();
  }

  getAllShowsAndDetails(){
    this.dashboardLoading = true;
    this.getallShowsSubscription = this.Tvshows.getAllShows().subscribe((data)=>{
      try{
        this.allShows = data;       
        this.topShows = this.allShows.sort((a: any,b: any)=> b.rating.average - a.rating.average).slice(0,20)
        this.dramaShows = this.allShows.filter((item:any)=>item.genres.includes("Drama")).slice(0,20);
        this.comedyShows = this.allShows.filter((item:any)=>item.genres.includes("Comedy")).slice(0,20);  
        this.dashboardLoading = false;      
      }catch(e){
        this.dashboardLoading = false;
      }
      
    },error =>{
      this.dashboardLoading = false;
    });
  }

  ngOnDestroy(){
    if(this.getallShowsSubscription)
      this.getallShowsSubscription.unsubscribe();
  }

}
