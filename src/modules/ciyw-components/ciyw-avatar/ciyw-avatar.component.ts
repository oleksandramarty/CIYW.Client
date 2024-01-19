import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {UserState} from "../../../kernel/store/state/user.state";
import {Observable, Subject, Subscription, takeUntil, tap} from "rxjs";
import {
  ApiClient,
  IImageDataResponse,
  ImageDataResponse,
  IUserResponse,
  UserImageQuery
} from "../../../kernel/services/api-client";
import {IUserBalance} from "../../../kernel/models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {handleApiError} from "../../../kernel/helpers/rxjs.helper";

@Component({
  selector: 'ciyw-avatar',
  templateUrl: './ciyw-avatar.component.html',
  styleUrl: './ciyw-avatar.component.scss'
})
export class CiywAvatarComponent implements OnInit, OnDestroy{
  @Input() imageData?: IImageDataResponse | undefined | null = null;
  @Input() userId?: string | undefined | null = null;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();


  constructor(
    private readonly apiClient: ApiClient,
    private readonly snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (!!this.userId) {
      this.apiClient.adminUsers_V1_GetUserImage({ userId: this.userId!} as UserImageQuery)
        .pipe(
          takeUntil(this.ngUnsubscribe),
          tap((result) => {
            this.imageData = result;
          }),
          handleApiError(this.snackBar)
        ).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
