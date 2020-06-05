import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService
    , private route: ActivatedRoute
    , private router: Router) { }

  ngOnInit() {
    // we comment ways of gettings server from params below as we changed to use
    // resolver to preload server data before this component is loaded, so we get it
    // from data on this route and we use observable and subscribe because the server
    // info may change while we are on this page.
    this.route.data
      .subscribe(
        (data: Data) => {
          this.server = data['server'];  //this 'server' is what we named property in the route map
        }
      );

    // // get the passed in server id, note htat we use snapshot
    // // here which is not reactive.  We use + to convert to number
    // const id = +this.route.snapshot.params['id']; // note this is string '1' not 1 numeric
    // this.server = this.serversService.getServer(id);

    // // if you wanted to react to changes, we then need to 
    // // subscribe to observable params
    // this.route.params.subscribe((params: Params) => {
    //   this.server = this.serversService.getServer(+params['id']); // note use of + to convert to number
    // });
  }

  onEdit() {
    // since we are already on the path 'servers/id', all we need is append 'edit' to our navigate
    // method below.  We could have also done something like this to provide full path like:
    // ['/servers', this.server.id, 'edit'] but that is not necessary since we are already on the
    // path.  So, we just use relative path and just add 'edit' to it.
    // but since using relative path, we also need to set relativeTo property so that Angular
    // router knows to which path to navigate relative to which location.
    // We also use queryParamsHandling: 'preserve' to preserve old parameters so then are not
    // lost when we navigate to EditServer component.  Other option is 'merge' which merges any
    // new params added here (which we dont do here), or default to drop them.
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
}
