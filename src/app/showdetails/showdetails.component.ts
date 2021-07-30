import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TvshowService } from '../Services/tvshow.service';

@Component({
  selector: 'app-showdetails',
  templateUrl: './showdetails.component.html',
  styleUrls: ['./showdetails.component.scss']
})
export class ShowdetailsComponent implements OnInit,OnDestroy {

  ShowDetailsId = 0;
  ShowDetailsSubscription : Subscription | undefined;
  ShowData:any;

  constructor(private activeRoute:ActivatedRoute,private Tvshows:TvshowService) { }

  ngOnInit(): void {
    this.activeRoute.params.forEach((params: Params)=>{
      if(params['id'] !== undefined){
        this.ShowDetailsId = params['id'];
        this.GetShowDetailsData();
      }else{
        this.ShowDetailsId = 0;
      }
    });

  }
  GetShowDetailsData(){
    this.ShowDetailsSubscription = this.Tvshows.getShowDetails(this.ShowDetailsId).subscribe((data)=>{
      try{
        console.log('showsdata',data);
        this.ShowData = data;
        
      }catch(e){

      }
      
    },error =>{

    });
  }
  ngOnDestroy(){
    if(this.ShowDetailsSubscription)
      this.ShowDetailsSubscription.unsubscribe();
  }

}
