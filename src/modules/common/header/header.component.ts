import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../kernel/store/state/user.state";
import {Observable, Subscription} from "rxjs";
import {OnLogout} from "../../../kernel/store/actions/user.actions";
import {IUserResponse} from "../../../kernel/services/api-client";
import {Router} from "@angular/router";

@Component({
  selector: 'ciyw-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Select(UserState.isAuthorized) isAuthorized$: Observable<boolean> | undefined;
  @Select(UserState.isUser) isUser$: Observable<boolean> | undefined;
  @Select(UserState.isAdmin) isAdmin$: Observable<boolean> | undefined;
  @Select(UserState.getUser) user$: Observable<IUserResponse> | undefined;

  user: IUserResponse | undefined;

  subs = new Subscription();

  constructor(
    private readonly store: Store,
    private router: Router
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

  goto(url: string): void {
    this.router.navigate([url]);
  }

}
