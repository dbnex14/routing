import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubsription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],  // since our route users/:id has "id", we can get access to it here.
      name: this.route.snapshot.params['name'] // similarly for the "name" param which is also passed through url route
    };

    // note we have this and we have above this.route.snapshot.params.  What is difference?  The difference is that
    // params here is an observable.  Observables are features added by some 3rd party component (not Angular) that
    // are heavily used by Angular and allow you to easily work with asynchronous tasks.
    // Observables allow you to subscibe to an event that may happen in the future to react to it without having to
    // wait on it now.  And that is what this.route.params is and we have to subscibe to it.
    // We need to use this method if we are to update our conponent based on params passed into the URL from 
    // within itself like we do here where we are already on this component displaying data for say 
    // user Id=3 ,name=Max but then from within it we have link or button trying to load another user with
    // id = 10, name = Ana.
    // Note that Angular will clean up this subsciption for you whenever this component gets destroyed.  This is
    // to remove reference being held once this component is destroyed.
    this.paramsSubsription = this.route.params
      .subscribe(  // takes 3 params
        (params: Params) => {  // 1st is function to execute when change occurs so it is a callback
            this.user.id = params['id'];
            this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy() {
    this.paramsSubsription.unsubscribe(); // see comment above, this is only needed when you create your own Observables
  }

}
