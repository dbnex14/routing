import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers(id: number) {
    // here I want to navigate to another route, say /servers
    // to do so, we need access to angular router.  We can inject it
    //this.router.navigate(['/servers']);

    // to navigate to one with id and pass queryParams and fragment and we see how to 
    // do same programatically.  the URL will again look as
    // 'http://localhost:4200/servers/1/edit?allowEdit=1#loading' same as the way we did 
    // from the template.
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});
  }
}
