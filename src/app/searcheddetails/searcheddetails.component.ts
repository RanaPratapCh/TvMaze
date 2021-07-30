import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { TvshowService } from '../Services/tvshow.service';

@Component({
  selector: 'app-searcheddetails',
  templateUrl: './searcheddetails.component.html',
  styleUrls: ['./searcheddetails.component.scss']
})
export class SearcheddetailsComponent implements OnInit,OnDestroy {

  UserSearch = "";
  GetUserSearchDetailsSubscription : Subscription | undefined;
  SearchResult : any;

  constructor(private activeRoute:ActivatedRoute,private Tvshows:TvshowService) { }

  ngOnInit(): void {

    this.activeRoute.params.forEach((params: Params)=>{
      if(params['SearchText'] !== undefined){
        this.UserSearch = params['SearchText'];
        this.GetSearchDetails();
      }else{
        this.UserSearch = "";
      }
    });

  }

  GetSearchDetails(){
    this.GetUserSearchDetailsSubscription = this.Tvshows.searchShow(this.UserSearch).subscribe((data)=>{
      try{
        console.log('search result : ',data);
        
        this.SearchResult = data;
      }catch(e){

      }
      
    },error =>{

    });
  }

  ngOnDestroy(){

    if(this.GetUserSearchDetailsSubscription)
      this.GetUserSearchDetailsSubscription.unsubscribe();

  }

}
