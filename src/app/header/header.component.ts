import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchText:string = "";

  constructor(public router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(formData:any){
    this.router.navigate(['/Search',formData.value.searchText])
  }

}
