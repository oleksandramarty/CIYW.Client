import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {UserState} from "../../../../kernel/store/state/user.state";
import {ResetUser} from "../../../../kernel/store/actions/user.actions";

@Component({
  selector: 'ciyw-admin-area',
  templateUrl: './admin-area.component.html',
  styleUrl: './admin-area.component.scss'
})
export class AdminAreaComponent implements OnInit, OnDestroy{
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  @Select(UserState.isAdmin) isAdmin$: Observable<boolean> | undefined;

  subs = new Subscription();

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit() {
    if (!!this.isAdmin$) {
      this.subs.add(this.isAdmin$.subscribe((isAdmin) => {
        if (!isAdmin) {
          this.store.dispatch(new ResetUser());
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
