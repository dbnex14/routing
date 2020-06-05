import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuardService } from "./auth-guard.service";
import { CanDeactivateGuardService } from "./servers/edit-server/can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";


const appRoutes: Routes = [
    // now with intro of nested routing, we have 3 top level routes and child routes
    { path: '', component: HomeComponent },                      // localhost:4200 (this is default 'home' "page")
    { path: 'users', component: UsersComponent, children: [      // localhost:4200/users
      { path: ':id/:name', component: UserComponent }      // localhost:4200/users/1/Max so we pass id param and name to this route
    ]},
    { path: 'servers', /*canActivate:*/ canActivateChild: [AuthGuardService], component: ServersComponent, children: [  // localhost:4200/servers.  Note guarded by AuthGuardService
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },               // localhost:4200/servers/1
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuardService] }       // localhost:4200/servers/1/edit to edit server with id=1.  We add 'edit' at the end to describe wheat we want to do
    ] },
    //{path: 'not-found', component: PageNotFoundComponent },   // if user enters some undefined route   
    // we pass static data with the data property to our route but how do we retrieve this
    // message in ErrorPageComponent?  Check there
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found'} },
    {path: '**', redirectTo: '/not-found' }
  ];

@NgModule({
  // see lesson on Location strategies (153) for useHash param
    //imports: [ RouterModule.forRoot(appRoutes, {useHash: true}) ],
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}