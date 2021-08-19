import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TvshowService {

  constructor(private http:HttpClient) { }

  getAllShows(){
    return this.http.get("https://api.tvmaze.com/shows");
  }

  searchShow(SearchString:string){
    return this.http.get("https://api.tvmaze.com/search/shows?q=" +SearchString);
  }
  getShowDetails(ShowId:number){
    return this.http.get("https://api.tvmaze.com/lookup/shows?thetvdb=" +ShowId);
  }
}
