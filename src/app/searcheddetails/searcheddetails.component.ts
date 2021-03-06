import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TvshowService } from '../services/tvshow.service';

@Component({
  selector: 'app-searcheddetails',
  templateUrl: './searcheddetails.component.html',
  styleUrls: ['./searcheddetails.component.scss']
})
export class SearcheddetailsComponent implements OnInit,OnDestroy {

  userSearch = "";
  getUserSearchDetailsSubscription: Subscription = new Subscription;
  searchResult : any = "";
  searchDetailsLoading = false;
  errorSearchDetailsLoading = false;

  constructor(private activeRoute:ActivatedRoute,private tvShows:TvshowService) { }

  ngOnInit(): void {
    this.accessingRouteParameter();
  }

  accessingRouteParameter(){
    this.activeRoute.params.forEach((params: Params)=>{
      if(params['SearchText'] !== undefined){
        this.userSearch = params['SearchText'];
        this.getSearchDetails();
      }else{
        this.userSearch = "";
      }
    });
  }


  getSearchDetails(){
    this.searchDetailsLoading = true;
    this.errorSearchDetailsLoading = false;
    this.getUserSearchDetailsSubscription = this.tvShows.searchShow(this.userSearch).subscribe((data)=>{
      try{    
        this.searchDetailsLoading = false;  
        this.errorSearchDetailsLoading = false; 
        this.searchResult = data;       
      }catch(e){
        this.searchDetailsLoading = false;
        this.errorSearchDetailsLoading = true;
      }
    },error =>{
      this.searchDetailsLoading = false;
      this.errorSearchDetailsLoading = true;
    });
  }

  ngOnDestroy(){

    if(this.getUserSearchDetailsSubscription)
      this.getUserSearchDetailsSubscription.unsubscribe();

  }

}
