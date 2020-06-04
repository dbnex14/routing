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


const appRoutes: Routes = [
    // now with intro of nested routing, we have 3 top level routes and child routes
    { path: '', component: HomeComponent },                      // localhost:4200 (this is default 'home' "page")
    { path: 'users', component: UsersComponent, children: [      // localhost:4200/users
      { path: ':id/:name', component: UserComponent }      // localhost:4200/users/1/Max so we pass id param and name to this route
    ]},
    { path: 'servers', /*canActivate:*/ canActivateChild: [AuthGuardService], component: ServersComponent, children: [  // localhost:4200/servers.  Note guarded by AuthGuardService
      { path: ':id', component: ServerComponent },               // localhost:4200/servers/1
      { path: ':id/edit', component: EditServerComponent }       // localhost:4200/servers/1/edit to edit server with id=1.  We add 'edit' at the end to describe wheat we want to do
    ] },
    {path: 'not-found', component: PageNotFoundComponent },   // if user enters some undefined route   
    {path: '**', redirectTo: '/not-found' }
  ];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}