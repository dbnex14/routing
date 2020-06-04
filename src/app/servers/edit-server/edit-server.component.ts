import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;

  constructor(private serversService: ServersService
    , private route: ActivatedRoute) { }

  ngOnInit() {
    // in order to retrieve our query params and fragment, we inject route in c-tor.  And
    // like before, there are 2 ways of retrieving them.
    // 1st approach: by using snapshot but this is only good at the time component is 
    //               created.  So, if you need to change your query params or fragment
    //               from the page you are currently on, this will not work because it is
    //               not reactive.
    console.log("Query Params: " + this.route.snapshot.queryParams);
    console.log("Fragment: " + this.route.snapshot.fragment);
    // 2nd approach: Use queryParams observable just like we used params observable in the
    //               previous lesson.  This allows you to subscribe and write a callback
    //               that gets executed when one of the observables changes.  You dont 
    //               need to unsubscribe here, Angular will do it for you but if you write
    //               your own observables, then you need to take care of unsubscribing
    //               yuurselves.  This way is reactive.  
    console.log("Query Params Observable: " + this.route.queryParams
      .subscribe(
        // are we allow to edit or not?
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1';  // if equal '1', allow editing
        }
      ));
    console.log("Framgment Observable: " + this.route.fragment.subscribe());

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    // this is using our serversService to get the server id, name, status and update server.
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
