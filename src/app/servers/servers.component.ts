import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService
    , private router: Router
    , private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // Here we use relative path 'servers' but we are already in /servers.  However,
    // this will not error because navigate method does not know where it currently
    // sits like routerLink does.  So, to tell it, we add 2nd parameter which is a
    // javascript object with relativeTo parameter.  This param receives not a string
    // but a route so we have to inject route as ActivatedRoute which is simply the
    // route where we are now.  Now angular knows where we are and will error out
    // if we click on the reload button as it knows it is in /servers, so making call
    // to /servers/servers make no sense since that path is not registered anywhere.
    //this.router.navigate(['servers'], {relativeTo: this.route});
  }
}
