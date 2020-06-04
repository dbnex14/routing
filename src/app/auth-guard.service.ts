import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service";

// inject AuthService into this guard service
@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) {}

    // So, we impolement CanActivate interface profided by the @angular/router package.  Here and provide 
    // canActivate method which receives the activated routee snapshot and router state snapshot.  But where
    // will this data come from?  Soon we will define that Angular is to execute this, so angular will provide
    // the inputs for us.
    // This method returns either Observable<boolean>, Promise<boolean> or boolean.  So, it can run both 
    // asynchronously returning Observable or Promise or synchronously returning boolean.
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // here we want to be able to log in our out and return promise we got from our fake auth service
        // which will resolve itself in 1 second.
        // So, this now allows us to control access or guard it but we are not using it yet.  To use it,
        // we need to add to our routes which route is protected by this guard.
        return this.authService.isAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;
                    } else {
                        this.router.navigate(['/']); //navigate to Home
                    }
                }
            )
    }
    
    // We implemnt this interface to allow guarding children rather than applying canActivate to each child separately.
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(childRoute, state);
    }
}