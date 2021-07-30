import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TvshowService } from '../Services/tvshow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  AllShows:any;
  Ratings: any[] =[];
  TopShows:any;
  DramaShows:any;
  ComedyShows:any;
  GetAllShowsSubscription : Subscription | undefined;

  constructor(private Tvshows:TvshowService) { }

  ngOnInit(): void {
    this.GetAllShowsAndDetails();
  }

  GetAllShowsAndDetails(){
    this.GetAllShowsSubscription = this.Tvshows.getAllShows().subscribe((data)=>{
      try{
        this.AllShows = data;
        console.log('data' , this.AllShows);
        this.TopShows = this.AllShows.sort((a: any,b: any)=> b.rating.average - a.rating.average).slice(0,6)
        this.DramaShows = this.AllShows.filter((item:any)=>item.genres.includes("Drama")).slice(0,6);
        this.ComedyShows = this.AllShows.filter((item:any)=>item.genres.includes("Comedy")).slice(0,6);
        console.log('top 20 : ' ,this.TopShows);
        console.log('Darama:',this.DramaShows);
        console.log('Comedy:',this.ComedyShows);
        
      }catch(e){
        
      }
      
    },error =>{

    });
  }

  ngOnDestroy(){
    if(this.GetAllShowsSubscription)
      this.GetAllShowsSubscription.unsubscribe();
  }

}
