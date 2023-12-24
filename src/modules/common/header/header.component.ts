import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../kernel/store/state/user.state";
import {Observable, Subscription} from "rxjs";
import {OnLogout} from "../../../kernel/store/actions/user.actions";
import {ICurrentUserResponse} from "../../../kernel/services/api-client";

@Component({
  selector: 'ciyw-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Select(UserState.isAuthorized) isAuthorized$: Observable<boolean> | undefined;
  @Select(UserState.getUser) user$: Observable<ICurrentUserResponse> | undefined;

  user: ICurrentUserResponse | undefined;

  subs = new Subscription();

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
    if (!!this.user$) {
      this.subs.add(this.user$.subscribe((user) => this.user = user));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(new OnLogout());
  }

}
