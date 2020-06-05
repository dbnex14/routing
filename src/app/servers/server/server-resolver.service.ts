import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";
import { Injectable } from "@angular/core";

// we define Server intrface here to specify type and make the code bit cleaner
// rather than defining type like {id: number, name: string, status: string} in below
// resolver.
interface Server {
    id: number;
    name: string;
    status: string;
}

// So, our resolver has to implement Resolve interface and it is generic
// so we have to define type it will receive.  We know our Server has id, name and status
// so we add that type hence {}.  Note we have to mark it Injectable if we want to be
// able to inject another service into this.  Which is the case here.
@Injectable()
export class ServerResolver implements Resolve<Server> {

    constructor(private serversService: ServersService) {}

    // takse route and state snapshowts and returns our type or Observable or Promisse of
    // our type.  So, it can instantly return data (synchronous) or asynchronously.
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
        // here we implement logic to get data.  We have servers.service we can use for that
        // Here we need to provier server id but we have routesnapshot so we can use that
        // always since in this case, this is called only when creating the route so the
        // snapshot is all we need.  So, this is easierst example of using a resolver to do
        // loading of data in advance before route is displayed.
        return this.serversService.getServer(+route.params['id']);
    }

}