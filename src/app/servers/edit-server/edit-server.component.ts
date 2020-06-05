import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  // we want to prevent (or at least ask) user from accidentally navigating
  // away if changes are not saved.
  changesSaved = false;

  constructor(private serversService: ServersService
    , private route: ActivatedRoute, private router: Router) { }

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

    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    // this is using our serversService to get the server id, name, status and update server.
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    // after the changes are saved, navigate back one level up to the last loaded server
    // relative to the currently active route
    this.router.navigate(['../'], {relativeTo: this.route});

  }

  // here we provide the actual logic checking if we can leave this component or not.
  // this logic is called from the CanDeactivateGuardService.
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.allowEdit) {
      return true;
    } 

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)
      && !this.changesSaved) {
        return confirm("Do you want to discard the changes?");
      } else {
        return true;
      }
  }

}
