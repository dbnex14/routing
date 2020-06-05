import { Observable } from "rxjs";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

// this interface will be implmented by our component on which we need to check
// if user can leave it or not.  So, that component will have to implemnt this
// and provide canDeactivate method which can then access that component's state
// to allow or disalow user leaving it (or prompt user to confirm).
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

// We implement Angular/router CanDeactivate interface which is a generic
// type which wraps our own CanComponentDeactivate interface.  This will allow
// us to easily connect component to our CanDeactivateGuardService.
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {
    // this is method that will be called by Angular once we try to leave a route
    canDeactivate(component: CanComponentDeactivate // component we are currently on
        , currentRoute: ActivatedRouteSnapshot // active route snapshot
        , currentState: RouterStateSnapshot // router state snapsont
        , nextState?: RouterStateSnapshot // (Optional) where do you want to go
        ): boolean | Observable<boolean> | Promise<boolean> // return observable, promise or boolean
    {
        // It is importnt to note the 1st param of this method has to be of type 
        // CanComponentDeactivate so, it needs to be a component which has implemented
        // CanComponentDeactivate interface and therefore has canDeactivate method.
        // We call canDeactivate on current component.  So, this is why we created and
        // implemented CanComponentDeactivate.  Now, the angular router can execute
        // canDeactivate in the service itself.
        return component.canDeactivate();
    }
    
}