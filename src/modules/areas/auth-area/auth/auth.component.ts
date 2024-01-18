import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../../kernel/store/state/user.state";
import {Observable, Subscription} from "rxjs";
import {HomeRedirect, ResetUser} from "../../../../kernel/store/actions/user.actions";

@Component({
  selector: 'ciyw-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy{
  @Select(UserState.isAuthorized) isAuthorized$: Observable<boolean> | undefined;

  subs = new Subscription();

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    if (!!this.isAuthorized$) {
      this.subs.add(this.isAuthorized$.subscribe((isAuthorized) => {
        if (!!isAuthorized) {
          this.store.dispatch(new HomeRedirect());
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
