import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  // What will be this message?  For routing, we have now only
  // one proper use case and that is that route was not found.
  errorMessage: string;

  // to retrieve static data passed in, we need ActivatedRoute
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Just like with QueryParams we can access this static data in 2 ways:
    // 1. using snapshot which workks only when this component is created 1st time
    //this.errorMessage = this.route.snapshot.data['message'];
    // 2. or by using data observable to which you subscribe if you think the data 
    // might change while on this component.
    // Now if you go and enter invalid route like "something" at the end of
    // localhost:4200/, you will land here.
    this.route.data.subscribe(
      (data: Data) => {
        this.errorMessage = data['message'];
      }
    );
  }

}
